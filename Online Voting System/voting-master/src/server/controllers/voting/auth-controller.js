module.exports = function(params) {
  const {
    data,
    cryptoUtils,
  } = params;

  return {
    name: 'votingAuth',
    login(req, res) {
      const {
        token,
        encOidDbId,
        signature,
      } = req.body;

      data.getVotingTokenInfoFromAuthService(token).then((tokenInfo) => {
        if (!tokenInfo) {
          throw new Error('Invalid credentials.');
        }

        if (tokenInfo.expirationDate < new Date()) {
          throw new Error('Your voting token has expired. Please login again.');
        }

        return Promise.all([
          cryptoUtils.decryptAES(
              tokenInfo.options.secret,
              encOidDbId.iv,
              encOidDbId.id,
              encOidDbId.authTag
          ),
          tokenInfo,
        ]);
      }).then((result) => {
        const [oidIdString, tokenInfo] = result;
        if (typeof oidIdString === 'undefined') {
          throw new Error('Invalid online identity file.');
        }

        return Promise.all([
          data.getOnlineIdentity(parseInt(oidIdString)),
          tokenInfo,
          oidIdString,
        ]);
      }).then((result) => {
        const [onlineIdentity, tokenInfo, oidIdString] = result;

        if (!onlineIdentity || !onlineIdentity.public_key) {
          throw new Error('No such online identity exists.');
        }
        return Promise.all([
          cryptoUtils.verifyECDSA256(
              onlineIdentity.public_key,
              oidIdString,
              signature,
              true
          ),
          tokenInfo,
          oidIdString,
        ]);
      }).then((result) => {
        const [isSignatureValid, tokenInfo, oidIdString] = result;

        if (!isSignatureValid) {
          throw new Error('Invalid online identity file.');
        }

        req.session.voter = {};
        req.session.voter.votingToken = token;
        req.session.voter.tokenExpirationDate = tokenInfo.expirationDate;
        req.session.voter.onlineIdentityId = parseInt(oidIdString);
        req.session.voter.electoralRegionsNames =
          tokenInfo.options.electoralRegionsNames;
        req.session.voter.ageGroup = tokenInfo.options.ageGroup;

        res.sendStatus(200);
      }).catch((error) => {
        res.status(400).send(error.message);
      });
    },
  };
};
