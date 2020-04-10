(function () {
  let form = $('#sign-in-form');
  let submitButton = $('#submit-login');
  let authServiceUrl = form.attr('action');
  let onCompleteUrl = form.attr('completed');

  function authenticate(encOidJson) {
    let formData = form.serializeFormJSON();

    let encOidDbIdHashSalt = cryptoHelper.generatePass(15);

    cryptoHelper.deriveAESKey(formData.pat, cryptoHelper.arrayToUint8Array(encOidJson.salt))
      .then(function (AESKey) {
        return cryptoHelper.decryptAES(AESKey,
          cryptoHelper.base64ToBuf(encOidJson.oid),
          cryptoHelper.arrayToUint8Array(encOidJson.iv));
      }).then(function (oidJwkJsonString) {
        if (!oidJwkJsonString) {
          throw new Error('Invalid credentials provided.');
        }

        localStorage.setItem('encOid', JSON.stringify({
          oid: encOidJson.oid,
          salt: encOidJson.salt,
          iv: encOidJson.iv
        }));

        return Promise.all([
          cryptoHelper.generateECDHKeys(),
          cryptoHelper.sha384(encOidJson.encOidDbId.id + encOidDbIdHashSalt),
          cryptoHelper.importJWKey(oidJwkJsonString)
        ]);
      }).then(function (result) {
        const [dhKeys, hash, oidPrivateKey] = result;
        const { privateKey: dhPrivateKey, publicKey: dhPublicKey } = dhKeys;

        if (!oidPrivateKey || !(oidPrivateKey instanceof CryptoKey)) {
          throw new Error('Invalid credentials provided.');
        }

        const requestData = {
          nin: formData.nin,
          dhPbk: dhPublicKey,
          encOidDbIdHash: {
            hash: hash,
            salt: encOidDbIdHashSalt
          },
        };

        return Promise.all([
          $.postJson(authServiceUrl + '/generate-voting-token', requestData),
          oidPrivateKey,
          dhPrivateKey,
          cryptoHelper.deriveAESKey(
            formData.pat,
            cryptoHelper.arrayToUint8Array(encOidJson.encOidDbId.salt))
        ]);
      }).then(function (result) {
        const [response, oidPrivateKey, dhPrivateKey, AESKey] = result;

        return Promise.all([
          cryptoHelper.deriveECDHKey(response.dhPublicKey, dhPrivateKey)
            .then(cryptoHelper.deriveAESKeyRaw),
          cryptoHelper.decryptAES(AESKey,
            cryptoHelper.base64ToBuf(encOidJson.encOidDbId.id),
            cryptoHelper.arrayToUint8Array(encOidJson.encOidDbId.iv)),
          response.token,
          oidPrivateKey
        ]);
      }).then(function (result) {
        const [AESKey, oidDbId, token, oidPrivateKey] = result;

        return Promise.all([
          cryptoHelper.encryptAES(AESKey, oidDbId),
          cryptoHelper.sign(oidPrivateKey, oidDbId),
          token
        ]);
      }).then(function (result) {
        const [encryptionResult, signature, token] = result;
        const [encryptedData, iv] = encryptionResult;

        const { data: id, authTag } = cryptoHelper.splitDataAndAuthTag(encryptedData)
        const requestData = {
          token,
          encOidDbId: {
            id,
            authTag,
            iv: cryptoHelper.uint8ArrayToArray(iv)
          },
          signature: cryptoHelper.bufToHex(signature),
        }

        return $.postJson('/account/login', requestData)
      }).then(function (response) {
        window.location.href = onCompleteUrl;
      }).catch(function (error) {
        // TODO: form feedback
        console.log(error.responseJSON || error);
        submitButton.attr('disabled', false);
      })

  }

  $('#sign-in-form').on('submit', function (e) {
    e.preventDefault();
    submitButton.attr('disabled', true);
    let reader = new FileReader();

    reader.onload = function (e) {
      let oidJson;
      try {
        oidJson = JSON.parse(e.target.result)
      } catch (error) {
        submitButton.attr('disabled', false);
        return;
      }
      authenticate(oidJson);
    }

    reader.readAsText(document.getElementById('oid').files[0], 'utf-8');
  })
})()