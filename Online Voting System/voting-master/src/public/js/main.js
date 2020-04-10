/**
 *
 *
 */
jQuery(document).ready(function () {
  var overrides = { 
    'sign-in-form': login,
    'form-voter-login': login,
    'endElectionForm': endElection
  };

  if (document.forms.length > 0) {
    let firstform = document.forms[0];
    if (firstform.method.toString().toLowerCase() !== 'get') {
      firstform.onsubmit = function() { return submit_form(firstform) };
    }
  }

  for (form in overrides) {
    let ele = document.getElementById(form);
    if (ele) {
      ele.onsubmit = function () { return overrides[form](ele) };
      break;
    }
  }
});

/**
 *
 *
 */
function submit_form(form) {
  if (form === undefined) {
    form = document.forms[0];
  }
  formToJSON(form);
	return false;
}

/**
 *
 *
 */
function submitFormAsJson(form) {
  submit_form(form);
	return false
}

/**
 *
 *
 */
function vote_now(candidate_id, election_id, action_url, complete_url){
    ajax_request({ candidate_id, election_id }, action_url, next_page, complete_url);
	return false;
}

/**
 *
 *
 */
function ajax_request(data, action_url, cb, cb_data){
	var xhr = new XMLHttpRequest();
  var JSONData = JSON.stringify(data);
  console.log(data,JSONData);
  if (action_url !== undefined && action_url !== "") {
    // Event handlers
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // if callback, run
        if (cb !== typeof undefined) {
          cb(this.response, cb_data);
        }
      } else {
        if (this.readyState == 4) {
          formErr(this.status + ": " + this.response);
        } else {
          formMsg("Loading... " + this.response);
        }
      }
    };

    xhr.open('POST', action_url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSONData);
  }
}

/**
 *
 *
 */
function next_page(response, nextPage) {
  formSuc("Success...");
  // if there is an attribute that defines where to go, go there
  if (typeof nextPage !== typeof undefined && nextPage !== false && nextPage !== "") {
    setTimeout(new_page(nextPage), 2000);
  }
}

/**
 *
 *
 */
function new_page(page) {
  window.location.href = page;
}

/**
 *
 *
 */
function login(form) {
  var f = document.getElementById('oid').files[0];

  if (f) {
    formMsg("Loading file");
    var r = new FileReader();
    r.onload = function (e) {
      let oid = JSON.parse(e.target.result);
      if (typeof oid !== typeof undefined) {
        let pat = document.getElementById('signinPassword').value;
        let nin = document.getElementById('signinNINumber').value;
        authenticate(oid, pat, nin, form);
      }
    }
    r.readAsText(f);
  } else {
    formErr("Failed to load file");
  }
    
    return false;
}

/**
 *
 *
 */
function endElection() {
  let f = document.getElementById('masterPrivateKeyPicker').files[0];
  let form = document.getElementById('endElectionForm')
  if (f) {
    formMsg("Loading file");
    let r = new FileReader();
    r.onload = function (e) {
      let masterPrivateKey = JSON.parse(e.target.result);
      ajax_request(
        {masterPrivateKey}, 
        form.getAttribute('action'), 
        next_page, 
        form.getAttribute('completed'))
    }
    r.readAsText(f);
  } else {
    formErr("Failed to load file");
  }
    
    return false;
}

/**
 *
 *
 */
function authenticate(encOid, pat, id, form) {

  let encOidDbIdHashSalt = cryptoHelper.generatePass(15);
  let store = [];

       
  cryptoHelper.deriveAESKey(pat, cryptoHelper.arrayToUint8Array(encOid.salt))
  .then(function (AESKey) {
    return cryptoHelper.decryptAES(AESKey,
      cryptoHelper.base64ToBuf(encOid.oid),
      cryptoHelper.arrayToUint8Array(encOid.iv));
  }).then(function (oidJwkJsonString) {
    if (!oidJwkJsonString) {     
      throw new Error('Invalid credentials provided.');
    }
            
    // encOid is retrieved during the voting procedure
    localStorage.setItem('encOid', JSON.stringify({
      oid: encOid.oid,
      salt: encOid.salt,
      iv: encOid.iv
    }));

    return Promise.all([
      cryptoHelper.generateECDHKeys(),
      cryptoHelper.sha384(encOid.encOidDbId.id + encOidDbIdHashSalt),
      cryptoHelper.importJWKey(oidJwkJsonString)
    ]);

  }).then(function (result) {
    const [dhKeys, hash, oidPrivateKey] = result;
    const { privateKey: dhPrivateKey, publicKey: dhPublicKey } = dhKeys;

    if (!oidPrivateKey || !(oidPrivateKey instanceof CryptoKey)) {
       throw new Error('Invalid credentials provided.');
    }

    const requestData = {
      nin: id,
      dhPbk: dhPublicKey,
      encOidDbIdHash: {
        hash: hash,
        salt: encOidDbIdHashSalt
      },
    };
    console.log(requestData);
    ajax_request(requestData, 
    form.getAttribute('action') + '/generate-voting-token/',
    authenticate_next,
    [oidPrivateKey, dhPrivateKey]);

  }).catch(function (error) {
    formErr(error.responseJSON || error);
    console.log(error.responseJSON || error);
  })
  function authenticate_next(response, cb_data) {
    let [oidPrivateKey, dhPrivateKey] = cb_data;
    json = JSON.parse(response);
    console.log(json, store);
    cryptoHelper.deriveAESKey(pat, cryptoHelper.arrayToUint8Array(encOid.encOidDbId.salt))
    .then(function (AESKey) {
      return Promise.all([
        cryptoHelper.deriveECDHKey(json.dhPublicKey, dhPrivateKey)
        .then(cryptoHelper.deriveAESKeyRaw),
        cryptoHelper.decryptAES(AESKey,
        cryptoHelper.base64ToBuf(encOid.encOidDbId.id),
        cryptoHelper.arrayToUint8Array(encOid.encOidDbId.iv)),
        json.token,
        oidPrivateKey
      ])
    }).then(function (result) {
      const [AESKey, oidDbId, token, oidPrivateKey] = result;
      return Promise.all([
        cryptoHelper.encryptAES(AESKey, oidDbId),
        cryptoHelper.sign(oidPrivateKey, oidDbId),
        token
      ]);
    }).then(function (result) {
      const [encryptionResult, signature, token] = result;
      const [encryptedData, iv] = encryptionResult;

      const { data: id, authTag } = cryptoHelper.splitDataAndAuthTag(encryptedData)
      const requestData = {
        token,
        encOidDbId: {
          id,
          authTag,
          iv: cryptoHelper.uint8ArrayToArray(iv)
        },
        signature: cryptoHelper.bufToHex(signature),
      }

      ajax_request(requestData, '/account/login', next_page, form.getAttribute('completed'));
    }).catch(function (error) {
      formErr(error.responseJSON || error);
      console.log(error.responseJSON || error);
    });
  }
}

/**
 *
 *
 */
function formMsg(text) {
  msg("form-messages", text, "form-wait");
}
function formErr(text) {
  msg("form-messages", text, "form-error");
}

/**
 *
 *
 */
function formSuc(text) {
  msg("form-messages", text, "form-success");
}

/**
 *
 *
 */
function msg(el, text, type) {
  out = document.getElementById(el);
  out.innerHTML = text;
  out.className = type;
}

/**
 *
 *
 */
function formToJSON(form) {
  var formData = {};
  let filepresent = false;
  console.log(form);
  for (var i = 0; i < form.length; i++) {
    let value = form[i].value;
    if (form[i].type === 'file') {
      if (form[i].files.length > 0) {
        getBase64(form[i].files[0], nonfiles);
        filepresent = true;
        break;
      }
    } else if (form[i].type === 'checkbox') {
      formData[form[i].name] = form[i].checked;
    } else {
      if (form[i].localName !== 'button') {
        formData[form[i].name] = value;
      }
    }

  }
  if (!filepresent) {
    ajax_request(formData, form.getAttribute('action'), next_page, form.getAttribute('completed'));
  }

  function nonfiles(e) {
  
    for (var i = 0; i < form.length; i++) {
      let value = form[i].value;
      if (form[i].type === "file") {
        value = e.target.result;
      }
      if (form[i].localName !== "button") {
        formData[form[i].name] = value;
      }
    }; 

    ajax_request(formData, form.getAttribute('action'), next_page, form.getAttribute('completed'));
  }


}

/**
 *
 *
 */
function getBase64(file, onLoadCallback) {
  var reader = new FileReader();
  reader.onload = onLoadCallback;
  reader.readAsDataURL(file);
}

/**
 *
 *
 */
function open_image (event, target) {
  var reader = new FileReader();
  reader.onload = function () {
    var dataURL = reader.result;
    var output = document.getElementById(target);
    output.src = dataURL;
  };
  reader.readAsDataURL(event.target.files[0]);
};


/**
 *
 *
 */
function refreshRegions() {
  ajax_request({}, './refresh/', undefined, undefined);
};

