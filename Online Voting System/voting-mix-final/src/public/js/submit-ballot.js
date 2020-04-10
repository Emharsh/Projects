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

    let encOid = JSON.parse(encOidJsonString);

    cryptoHelper.deriveAESKey(pat, cryptoHelper.arrayToUint8Array(encOid.salt))
      .then((key) => {

        return cryptoHelper.decryptAES(
          key, 
          cryptoHelper.base64ToBuf(encOid.oid), 
          cryptoHelper.arrayToUint8Array(encOid.iv)
        )
      }).then((oidJwkJsonString) => {
        return cryptoHelper.importJWKey(oidJwkJsonString)
      }).then((oidPrivateKey) => {
        if (!oidPrivateKey || !(oidPrivateKey instanceof CryptoKey)) {
          throw new Error('Invalid credentials provided.');
        }

        return cryptoHelper.sign(oidPrivateKey, ballotString)
      }).then((signature) => {
        const requestData = {
          ballotJsonString: ballotString,
          signature: cryptoHelper.bufToHex(signature)
        }
        return $.postJson('/vote', requestData)
      }).then((response) => {
        alert('Your vote was cast successfully!');
        window.location.href='/account';
      }).catch((error) => {
        alert('An error occurred while sending your ballot. Make sure you have the right credentials. ' + 
        'If you are sure you do, re-login and try again.')
        $(this).attr('disabled', false);
      })
  })
}
