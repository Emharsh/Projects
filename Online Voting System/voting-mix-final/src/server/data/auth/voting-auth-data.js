const constants = require('../../config/constants');

/**
 *
 *
 * @export
 * @param {*} options
 * @return {VotingAuthData}
 */
module.exports = function(options) {
  const {
    httpRequester,
    cryptoUtils,
    config,
  } = options;

  return {
    getVotingTokenInfoFromAuthService(token) {
      return Promise.all([
        cryptoUtils.signECDSA256(config.votingServicePrivateKey, token),
        cryptoUtils.generateECDHKeys(),
      ]).then((result) => {
        const [signature, keyPair] = result;

        const requestData = {
          token,
          signature,
          dhPbk: keyPair.publicKey,
        };

        return Promise.all([
          httpRequester.postJson(
              config.fullAuthServiceUrl + constants.AUTH_API.TOKEN_INFO_URL,
              requestData),
          keyPair.privateKey,
        ]);
      }).then((result) => {
        const [response, dhPrivateKey] = result;

        const {
          encTokenInfo,
          dhPbk: dhPublicKey,
        } = response;
        return cryptoUtils.deriveECDHKey(dhPublicKey, dhPrivateKey)
            .then((key) => {
              return cryptoUtils.decryptAES(
                  key,
                  encTokenInfo.iv,
                  encTokenInfo.data,
                  encTokenInfo.authTag
              );
            });
      }).then((tokenInfoJsonString) => {
        const tokenInfo = JSON.parse(tokenInfoJsonString);
        tokenInfo.expirationDate = new Date(tokenInfo.expirationDate);
        if (typeof tokenInfo.options === 'string'
          || tokenInfo.options instanceof String) {
          tokenInfo.options = JSON.parse(tokenInfo.options);
        }
        return tokenInfo;
      });
    },
    markTokenUsedInElection(token, electionId) {
      const payload = JSON.stringify({
        token,
        electionId,
      });

      return cryptoUtils.signECDSA256(
          config.votingServicePrivateKey,
          payload
      ).then((signature) => {
        const requestData = {
          payload,
          signature,
        };

        return httpRequester.postJson(
            config.fullAuthServiceUrl +
              constants.AUTH_API.MARK_TOKEN_USED_IN_ELECTION_URL,
            requestData);
      }).then(() => {
        return true;
      });
    },
  };
};
