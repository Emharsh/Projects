/**
 *
 *
 * @export
 * @param {*} options
 * @return {OnlineIdentityData}
 */
module.exports = function(options) {
  const {
    OnlineIdentity,
  } = options.models;

  const cryptoUtils = options.cryptoUtils;

  return {
    createOnlineIdentity(publicKey, convertJwkToPem) {
      let promiseChain = Promise.resolve();

      if (convertJwkToPem) {
        promiseChain = promiseChain.then(() => {
          return cryptoUtils.jwKeyToPem(publicKey);
        });
      }

      promiseChain = promiseChain.then((pemKey) => {
        return OnlineIdentity.query()
            .insert({
              public_key: pemKey || publicKey,
            });
      });

      return promiseChain;
    },
    getOnlineIdentity(id) {
      return OnlineIdentity.query().findById(id);
    },
  };
};
