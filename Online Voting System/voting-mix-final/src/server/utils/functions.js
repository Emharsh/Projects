/**
 *
 *
 * @param {*} blob
 * @return {String}
 */
function blobToString(blob) {
  return Buffer.from(blob).toString('ascii');
}

/**
 *
 *
 * @param {Json} json
 * @return {Array}
 */
function jsonToArr(json) {
  const fields = {};
  Object.keys(json).forEach(function(i) {
    fields[json[i].name] = json[i].value;
  });
  return fields;
}

/**
 * @param {Date} date
 * @return {String}
 */
function dateToStdString(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = '' + d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

/**
 * @param {Date} date
 * @return {String}
 */
function timeToStdString(date) {
  const d = new Date(date);
  let hour = '' + d.getHours();
  let min = '' + d.getMinutes();

  if (hour.length < 2) hour = '0' + hour;
  if (min.length < 2) min = '0' + min;

  return [hour, min].join(':');
}

/**
 * @param {Date} date
 * @return {Dictonary}
 */
function datetimeToStdString(date) {
  const strDate = dateToStdString(date);
  const strTime = timeToStdString(date);
  return {date: strDate, time: strTime};
}

/**
 * @param {String} str
 * @return {String}
 */
function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}


/**
 *
 *
 */
function genOidAndPAT() {
  const cryptoHelper = require('./crypto-helper');
  const pat = cryptoHelper.generatePass();
  const privateOidSalt = cryptoHelper.generatePbkdf2Salt();
  const publicOidIdSalt = cryptoHelper.generatePbkdf2Salt();

  cryptoHelper.generateECDSAKeys()
      .then(function(keypair) {
        return Promise.all([
          cryptoHelper.extractJWKey(keypair.privateKey),
          cryptoHelper.extractJWKey(keypair.publicKey),
          cryptoHelper.deriveAESKey(pat, privateOidSalt)
        ]);
      })
      .then(function(result) {
        const [privateKey, publicKey, AESKey] = result

        return Promise.all([
          cryptoHelper.encryptAES(AESKey, JSON.stringify(privateKey)),
          $.postJson('/register-oid', publicKey),
          cryptoHelper.deriveAESKey(pat, publicOidIdSalt)
        ]);
      })
      .then(function(result) {
        const [encryptionResult, requestResponse, AESKey] = result;
        const [encryptedOid, iv] = encryptionResult;
        const oidJson = {
          salt: cryptoHelper.uint8ArrayToArray(privateOidSalt),
          oid: cryptoHelper.bufToBase64(encryptedOid),
          iv: cryptoHelper.uint8ArrayToArray(iv)
        };

        return Promise.all([
          cryptoHelper.encryptAES(AESKey, requestResponse.dbId),
          Promise.resolve(oidJson)
        ]);
      })
      .then(function(result) {
        const [encryptionResult, oidJson] = result
        const [encryptedOidDbId, iv] = encryptionResult;

        const encOidDbId = {
          salt: cryptoHelper.uint8ArrayToArray(publicOidIdSalt),
          id: cryptoHelper.bufToBase64(encryptedOidDbId),
          iv: cryptoHelper.uint8ArrayToArray(iv)
        };

        oidJson.encOidDbId = encOidDbId

        const oidContainer = $('#downloadOidTrigger');
        oidContainer.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(oidJson)));

        return $.putJson('/set-voter-enc-oid', { nino: $('#registerNIN').val(), encOidDbId })
      })
      .then(function(result) {
        const printPatButton = $('#printPatBtn');
        const downloadOidBtn = $('#downloadOidBtn');
        const patLetter = document.getElementById('patLetterTemplate').contentWindow;
        patLetter.document.getElementById('pat').innerText = pat;

        printPatButton.on('click', function() {
          const patLetterWeakRef = document.getElementById('patLetterTemplate').contentWindow;
          patLetterWeakRef.focus();
          patLetterWeakRef.print();
        });
        downloadOidBtn.on('click', function() {
          document.getElementById('downloadOidTrigger').click()
        });

        printPatButton.text('Print PAT letter');
        downloadOidBtn.text('Download OID');
        printPatButton.attr('disabled', false);
        downloadOidBtn.attr('disabled', false);
      })
      .catch(function(error) {
      });
}

module.exports = {
  blobToString,
  jsonToArr,
  dateToStdString,
  datetimeToStdString,
  toTitleCase,
  genOidAndPAT,
};