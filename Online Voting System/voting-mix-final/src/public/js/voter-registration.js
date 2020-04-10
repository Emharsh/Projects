/**
 *
 *
 */
function genOidAndPAT() {
  const pat = cryptoHelper.generatePass();
  const privateOidSalt = cryptoHelper.generatePbkdf2Salt();
  const publicOidIdSalt = cryptoHelper.generatePbkdf2Salt();

  cryptoHelper.generateECDSAKeys()
      .then(function(keypair)  {
        return Promise.all([
          cryptoHelper.extractJWKey(keypair.privateKey),
          cryptoHelper.extractJWKey(keypair.publicKey),
          cryptoHelper.deriveAESKey(pat, privateOidSalt),
        ]);
      })
      .then(function(result) {
        const [privateKey, publicKey, AESKey] = result;

        return Promise.all([
          cryptoHelper.encryptAES(AESKey, JSON.stringify(privateKey)),
          $.postJson('./register/', publicKey),
          cryptoHelper.deriveAESKey(pat, publicOidIdSalt),
        ]);
      })
      .then(function(result) {
        const [encryptionResult, requestResponse, AESKey] = result;
        const [encryptedOid, iv] = encryptionResult;

        if (!AESKey || !encryptionResult || !requestResponse ) {
          throw new Error(encryptionResult);
        };
        const oidJson = {
          salt: cryptoHelper.uint8ArrayToArray(privateOidSalt),
          oid: cryptoHelper.bufToBase64(encryptedOid),
          iv: cryptoHelper.uint8ArrayToArray(iv),
        };

        return Promise.all([
          cryptoHelper.encryptAES(AESKey, requestResponse.dbId),
          Promise.resolve(oidJson),
        ]);
      })
      .then(function(result) {
        const [encryptionResult, oidJson] = result;
        const [encryptedOidDbId, iv] = encryptionResult;

        const encOidDbId = {
          salt: cryptoHelper.uint8ArrayToArray(publicOidIdSalt),
          id: cryptoHelper.bufToBase64(encryptedOidDbId),
          iv: cryptoHelper.uint8ArrayToArray(iv),
        };

        oidJson.encOidDbId = encOidDbId;

        const oidContainer = document.getElementById('downloadOidTrigger');
        oidContainer.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(oidJson));

        return $.putJson('./setOid/', { encOidDbId });
      })
      .then(function(_result) {
        const printPatButton = document.getElementById('printPatBtn');
        const downloadOidBtn = document.getElementById('downloadOidBtn');
        const patLetter = document.getElementById('patLetterTemplate');
        console.log(printPatButton);
        patLetter.contentWindow.document.getElementById('pat').innerText = pat;

        printPatButton.innerHTML = 'Print PAT letter';
        downloadOidBtn.innerHTML = 'Download OID';
        printPatButton.disabled = false;
        downloadOidBtn.disabled = false;
      })
      .catch(function(error) {
        formErr(error);
      })
}

function printPat() {
  const patLetterWeakRef = document.getElementById('patLetterTemplate').contentWindow;
  patLetterWeakRef.focus();
  patLetterWeakRef.print();
}

function downloadOid() {
  document.getElementById('downloadOidTrigger').click();
}

const letterTemplate = $('<iframe>', {
  id: 'patLetterTemplate',
  src: '/admin/templates/pat/',
  style: 'width:0; height:0; border:0; border:none',
});
