(function ($) {
  // Parse form data to json
  // taken from https://jsfiddle.net/gabrieleromanato/bynaK/
  $.fn.serializeFormJSON = function () {

    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

  $.sendJson = function (method, url, json) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: method,
        url: url,
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
      })
        .done(function (response) {
          resolve(response);
        })
        .fail(function (jqXhr, textStatus, error) {
          if (jqXhr.status < 300) {
            resolve()
          }
          reject(jqXhr, textStatus, error);
        })
    });
  };

  $.postJson = function (url, json) {
    return $.sendJson('POST', url, json);
  };

  $.putJson = function (url, json) {
    return $.sendJson('PUT', url, json);
  };
})(jQuery);