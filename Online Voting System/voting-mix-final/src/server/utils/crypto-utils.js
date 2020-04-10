/* eslint-disable no-invalid-this */
const jwkToPem = require('jwk-to-pem');
const crypto = require('crypto');
const uuid = require('uuid/v4');
const asn1 = require('asn1.js');
const BN = require('bn.js');

/**
 *
 *
 * @param {JsonWebKey} jwk
 * @param {boolean} isPrivateKey
 * @return {Promise<string>} JWK in Pem format
 */
function jwKeyToPem(jwk, isPrivateKey) {
  const options = {private: !!isPrivateKey};
  return new Promise((resolve, reject) => {
    try {
      resolve(jwkToPem(jwk, options));
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 *
 * @param {*} messages Messages to derive a hash from,
 * provided as separate arguments
 * @return {Promise<string>} Hash as hex string
 */
function sha384(...messages) {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha384');

      for (const message of messages) {
        if (!message) {
          continue;
        }
        hash.update(message, 'utf8');
      }

      resolve(hash.digest('hex'));
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 * @return {Promise<KeyPair>}
 */
function generateECDHKeys() {
  return new Promise((resolve, reject) => {
    try {
      const ecdhP256 = crypto.createECDH('prime256v1');
      ecdhP256.generateKeys();
      const keyPair = {
        privateKey: ecdhP256.getPrivateKey('hex'),
        publicKey: ecdhP256.getPublicKey('hex'),
      };

      resolve(keyPair);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 *
 * @param {string} publicKey The public key of the remote party as hex
 * @param {string} privateKey Private key as hex
 * @return {Promise<string>} Key as hex string
 */
function deriveECDHKey(publicKey, privateKey) {
  return new Promise((resolve, reject) => {
    try {
      const ecdhP256 = crypto.createECDH('prime256v1');
      ecdhP256.setPrivateKey(privateKey, 'hex');

      const key = ecdhP256.computeSecret(publicKey, 'hex', 'hex');

      resolve(key);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 *
 * @param {string} key
 * @param {ArrayBuffer|Array} iv
 * @param {string} message
 * @param {string} authTag
 * @return {Promise<string>} The decrypted message
 */
function decryptAES(key, iv, message, authTag) {
  if (typeof iv === 'string' || iv instanceof String) {
    iv = Buffer.from(iv, 'hex');
  } else if (Array.isArray(iv)) {
    iv = new Uint8Array(iv);
  }

  if (typeof key === 'string' || key instanceof String) {
    key = Buffer.from(key, 'hex');
  }

  authTag = Buffer.from(authTag, 'hex');

  return Promise.resolve().then(() => {
    const aes = crypto.createDecipheriv('aes-256-gcm', key, iv);
    aes.setAuthTag(authTag);
    let result = aes.update(message, 'hex', 'utf8');
    result += aes.final('utf8');

    return result;
  });
}

/**
 *
 *
 * @param {string} key
 * @param {string} message
 * @return {Object<data, iv, authTag>}
 */
function encryptAES(key, message) {
  if (typeof key === 'string' || key instanceof String) {
    key = Buffer.from(key, 'hex');
  }
  return Promise.resolve().then(() => {
    const iv = crypto.randomBytes(16);
    const aes = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = aes.update(message, 'utf8', 'hex');
    encrypted += aes.final('hex');
    const authTag = aes.getAuthTag().toString('hex');

    return {
      data: encrypted,
      authTag,
      iv: iv.toString('hex'),
    };
  });
}

/**
 *
 *
 * @param {string} publicKey Public Key in PEM format
 * @param {string} message The expected message
 * @param {string} signature The received signature (hex string)
 * @param {boolean} isWebCryptoSignature
 * @return {Promise<boolean>}
 */
function verifyECDSA256(publicKey, message, signature, isWebCryptoSignature) {
  let promiseChain = Promise.resolve();

  if (isWebCryptoSignature) {
    promiseChain = promiseChain.then(() => {
      return webCryptoToAsn1Sig(signature);
    });
  }

  return promiseChain.then((convertedSignature) => {
    const verifier = crypto.createVerify('sha256');
    verifier.update(message, 'utf8');
    verifier.end();

    return verifier.verify(publicKey, convertedSignature || signature, 'hex');
  });
}

/**
 *
 *
 * @param {string} privateKey Private key in PEM format
 * @param {string} message Message to sign
 * @return {string} signature (hex string)
 */
function signECDSA256(privateKey, message) {
  return Promise.resolve().then(() => {
    const signer = crypto.createSign('sha256');
    signer.write(message, 'utf8');
    signer.end();

    return signer.sign(privateKey, 'hex');
  });
}


/**
 * Adapted from https://stackoverflow.com/a/39651457
 *
 * @param {string} signature signature as hex string
 * @return {string} der signature
 */
function webCryptoToAsn1Sig(signature) {
  const signatureBuffer = Buffer.from(signature, 'hex');
  const ECDSADerSig = asn1.define('ECPrivateKey', function() {
    return this.seq().obj(
        this.key('r').int(),
        this.key('s').int()
    );
  });

  const r = new BN(signatureBuffer.slice(0, 32).toString('hex'), 16, 'be');
  const s = new BN(signatureBuffer.slice(32).toString('hex'), 16, 'be');

  return ECDSADerSig.encode({r, s}, 'der');
}

/**
 *
 *
 * @return {string} V4 uuid
 */
function generateUuid() {
  return uuid();
}

/**
 *
 *
 * @param {string} password password to apply pbkdf2 to
 * @param {string?} salt optional: the salt to use
 * @param {*} options
 * @return {Promise<Object>} {derivedKey, salt}
 */
function pbkdf2(password, salt, options) {
  return new Promise((resolve, reject) => {
    salt = salt || crypto.randomBytes(32).toString('hex');
    options = options || {};
    options.iterations = options.iterations || 10000;
    options.keylen = options.keylen || 128;
    options.digest = options.digest || 'sha512';

    crypto.pbkdf2(password,
        salt,
        options.iterations,
        options.keylen,
        options.digest,
        (error, derivedKey) => {
          if (error) {
            reject(error);
          } else {
            resolve({derivedKey: derivedKey.toString('hex'), salt});
          }
        });
  });
}

/**
 *
 *
 * @param {string} publicKey
 * @param {string} dataString
 * @return {Promise<string>}
 */
function rsaPKCS1OaepEncrypt(publicKey, dataString) {
  return Promise.resolve().then(() => {
    return crypto.publicEncrypt({
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(dataString, 'utf8')).toString('hex');
  });
}

/**
 *
 *
 * @param {string} privateKey
 * @param {string} hexString
 * @return {Promise<string>}
 */
function rsaPKCS1OaepDecrypt(privateKey, hexString) {
  return Promise.resolve().then(() => {
    return crypto.privateDecrypt({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    }, Buffer.from(hexString, 'hex')).toString('utf8');
  });
}

/**
 *
 *
 * @param {int} length
 * @return {String} random string
 */
function randomHexString(length) {
  length = length || 32;
  return crypto.randomBytes(length).toString('hex');
}

crypto.getRandomValues = crypto.randomFillSync;


module.exports = {
  jwKeyToPem,
  sha384,
  generateUuid,
  generateECDHKeys,
  deriveECDHKey,
  encryptAES,
  decryptAES,
  pbkdf2,
  signECDSA256,
  verifyECDSA256,
  webCryptoToAsn1Sig,
  rsaPKCS1OaepEncrypt,
  rsaPKCS1OaepDecrypt,
  randomHexString,
};
