/**
 * @export
 * @param {*} params
 * @return {AjaxControllers}
 */
module.exports = function(params) {
  const {
    data,
    cryptoUtils,
    functions,
    config,
    blox,
  } = params;

  return {

    vote(req, res) {
      const resTxt = res.locals.settings.responses;
      const candidateId = req.body['candidate_id'];
      const electionId = req.body['election_id'];

      res.statusCode = 401;
      if (req.session && req.session.voter) {
        const onlineIdentityId = req.session.voter.onlineIdentityId;

        data.addBallot(electionId, onlineIdentityId, candidateId)
            .then(function(result) {
              res.statusCode = 200;
              return res.send(resTxt['suc-vote']);
            });
      } else {
        return res.send(resTxt['err-sess-none']);
      }
    },

    login_admin(req, res) {
      const resTxt = res.locals.settings.responses;
      fields = functions.jsonToArr(req.body);

      res.statusCode = 401;

      data.getVoter(fields.signinNINumber).then((result) => {
        if (result) {
          if (result.length == 1) {
            user = result[0];

            if ((user['passwordhash'] === fields.signinPassword.hashCode()) &&
              (parseInt(
                  functions.blobToString(user['enc_onlineidentity_id']), 10)
                === fields.signinOnlineID_text.hashCode()
              )
            ) {
              req.session.admin.id = user['id'];

              res.statusCode = 200;
              returnVal = resTxt['suc-login'];
            } else {
              returnVal = resTxt['err-login-pass'];
            }
          } else if (result.length == 0) {
            returnVal = resTxt['err-login-ni'];
          } else {
            returnVal = resTxt['err-login-ni-multi'];
          }
        } else {
          returnVal = resTxt['err-ni'];
        }
        return res.send(returnVal);
      });
    },
  };
};
