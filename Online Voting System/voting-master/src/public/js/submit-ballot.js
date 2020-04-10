function submitBallot(ballotJson) {
  document.getElementById('openConfirmModalBtn').click();
  
  $('#confirmCastVoteBtn').click(function() {
    let form = document.getElementById('confirmPatForm');
    if (!form.reportValidity() || !form.checkValidity()) {
      return;
    }
    let pat = $('#pat').val()
    ballotJson.electionId = parseInt($(this).attr('for-election'));
    ballotString = JSON.stringify(ballotJson);
    $(this).attr('disabled', true);
    let encOidJsonString = localStorage.getItem('encOid');
    if (!encOidJsonString) {
      alert('Your online identity file is missing. Please log in again.');
      window.location.href = '/account/logout';
    }

    console.log('Enoding Start');
    let encOid = JSON.parse(encOidJsonString);

    cryptoHelper.deriveAESKey(pat, cryptoHelper.arrayToUint8Array(encOid.salt))
      .then((key) => {
        console.log('Part 1', key);
        return cryptoHelper.decryptAES(
          key, 
          cryptoHelper.base64ToBuf(encOid.oid), 
          cryptoHelper.arrayToUint8Array(encOid.iv)
        )
      }).then((oidJwkJsonString) => {
        console.log('Part 2', oidJwkJsonString);
        return cryptoHelper.importJWKey(oidJwkJsonString)
      }).then((oidPrivateKey) => {
        console.log('Part 3', oidPrivateKey);
        if (!oidPrivateKey || !(oidPrivateKey instanceof CryptoKey)) {
          throw new Error('Invalid credentials provided.');
        }

        return cryptoHelper.sign(oidPrivateKey, ballotString)
      }).then((signature) => {
        console.log('Part 4', signature);
        const requestData = {
          ballotJsonString: ballotString,
          signature: cryptoHelper.bufToHex(signature)
        }
        return $.postJson('/vote', requestData)
      }).then((response) => {
        console.log('Part 5', response);
        alert('Your vote was cast successfully!');
        window.location.href='/account';
      }).catch((error) => {
        if (error.responseJSON) {
          formErr(error.responseJSON.message);
          console.log(error.responseJSON);
        } else {
          formErr(error);
          console.log(error);
        }

        $(this).attr('disabled', false);
      })
  })
}
