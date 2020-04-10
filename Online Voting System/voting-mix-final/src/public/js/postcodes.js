function checkpostcode(target) {
  var postcode = document.getElementById(target).value;
  console.log(postcode);
  postcodeVerify(postcode, true);
}

function postcodeVerify(postcode, send) {
  var postcodeForm = document.getElementById('jsondata1');
  $.ajax({
    url: 'https://mapit.mysociety.org/postcode/' + postcode,
    crossOrigin: true,
    dataType: 'json',
    success: function success(data) {
      if (send) {
        console.log(data);
        postcodeForm.innerHTML = '<span>' + JSON.stringify(data.areas, null, ' </br>') + "</span>";
        postcodeGet(postcode, true);
      }
    },
    error: function error(error) {
      postcodeForm.innerHTML = 'form-error ' + error;
    }
  });
};

function postcodeGet(postcode, send) {
  var postcodeForm = document.getElementById('jsondata2');
  $.ajax({
    url: 'https://wheredoivote.co.uk/api/beta/postcode/'+postcode+'.json',
    dataType: 'json',
    crossOrigin: true,
    success: function success(data) {
      if (send) {
        console.log(data);
        postcodeForm.innerHTML = '<span>' + JSON.stringify(data, null, '\t</br>') + "</span>";
      } else {
        postcodeForm.innerHTML = 'form-error';
      }
    },
    error: function error(error) {
      console.log(error);
      postcodeForm.innerHTML += 'form-error ' + error;
    }
  });
}
