/**
 *
 *
 */
function createElection() {
  const basicDetails = $('#form-new-election').serializeFormJSON();
  const regions = [];
  $('input[name=region]').each(function(_i, e) {
    if ($(e).val()) {
      regions.push($(e).val());
    }
  })
  const candidateIds = [];
  $('input[type=checkbox]:checked').each(function(_i, e) {
    candidateIds.push($(e).val());
  })
  const data = {
    name: basicDetails.name,
    startYear: basicDetails.startYear,
    startMonth: basicDetails.startMonth,
    startDay: basicDetails.startDay,
    candidateIds,
    regions
  }

  cryptoHelper.generateRsaOAEPKeys().then(function (keyPair) {
    console.log(keyPair);
    return Promise.all([
      cryptoHelper.extractJWKey(keyPair.privateKey),
      cryptoHelper.extractJWKey(keyPair.publicKey)
    ])
  }).then(function (jwKeys) {
    console.log(jwKeys);
    const [privateKey, publicKey] = jwKeys;
    data.masterKey = publicKey;
    const publicKeyButton = $('#button-generate-keys');
    const privateKeyContainer = $('#button-download-key');
    const publicKeyContainer = document.getElementById('election-master-key');
    const submitButton = document.getElementById('submit-new-election');
    publicKeyContainer.value = JSON.stringify(publicKey);
    submitButton.disabled = false;
    publicKeyButton.addClass('hidden');
    privateKeyContainer.removeClass('hidden');
    privateKeyContainer.attr('download', 'master_key_' + basicDetails.name + '.jwk');
    privateKeyContainer.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(privateKey)));
  }).catch(function (error) {
    formErr(error);
  })
}
