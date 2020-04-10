/*global jQuery*/
/**
 * electoral-commission
 * Global JS
 *
 * version: 0.0.1
 * file:    global.js
 * author:  Arkadiusz Chatys achatys@squiz.pl

/*
 * Table of Contents
 *
 * 1. Mobile view changes
 * 2. Flexbox fallback
 * 3. Full page banner
 * 4. Get URL GET Parameter
 * 5 Geolocation
 *  5.1 Geolocation Init
 *  5.2 Geolocation Error
 *  5.3 Geolocation - user's country
 * 6. Cookies
 *  6.1 Sets Cookies
 *  6.2 Gets Cookies
 * 7. Region Related
 *  7.1 Homepage Square Boxes Data Pull
 *  7.2 Homepage Banner Data Pull
 *  7.3 Global Logotype Data Pull
 *  7.4 Homepage Square Boxes Template
 *  7.5 Homepage Banner Template
 *  7.6 Global Logotype Template
 * 8. Location Results
 *  8.1 Finds "NewDistrictCode" from given postcode
 *  8.2 Data for particular postcode
 *  8.3 Upcoming Elections Template

 */
'use strict';
/*
--------------------
Global
--------------------
*/
//  Declare JS Enabled.

$('body').removeClass('no-js').addClass('js-enabled');

// Uncomment this for dev work on repo
// var regionJSON = '',
//     regionBannerJSON = '',
//     regionLogotypeJSON = '';

// 1. Mobile view changes
// Changes for mobile view under 768 pixels.
// Appending elements to other places in DOM
var mobileViewChanges = function mobileViewChanges() {
  var header = $('.header'),
      languages = $('.header__languages'),
      searchBar = $('.header__search'),
      logotype = $('.header__logotype'),
      logotypeSubtitle = $('.header__logotype--subtitle'),
      navigation = $('.header__navigation');

  if ($(window).width() < 769) {
    logotype.before(languages);
    languages.before(logotypeSubtitle);
    searchBar.before(navigation);
  } else {
    searchBar.after(languages);
    header.append(navigation);
    logotype.append(logotypeSubtitle);
  }
};

// 2. Flexbox fallback
// Gives .same-height__item elements equal height
var flexboxBehaviour = debounce(function () {
  if ($(window).width() >= 768 && $('.same-height__item').length > 0) {
    $(".same-height__item").attr("style", "");

    var heights = $(".same-height__item").map(function () {
      return $(this).outerHeight();
    }).get(),
        maxHeight = Math.max.apply(null, heights);
    $(".same-height__item").outerHeight(maxHeight);
  }

  if ($(window).width() < 768) {
    $(".same-height__item").attr("style", "");
  }
}, 250);

// 3. Full page banner
// Takes height of window and makes banner full page big
var fullPageBanner = debounce(function () {
  var banner = $('.homepage .masthead'),
      windowSize = $(window).height(),
      headerSize = $('header').height(),
      cookiesSize = $('.cookies-message').height();

  if ($(window).width() >= 768 && banner.length > 0) {
    banner.height(windowSize - headerSize - cookiesSize - 10);
  }
}, 250);

// 4. Get URL GET Parameter
var getUrlParameter = function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// 5. Geolocation

// 5.1 Geolocation Init
// Checks Latitude and Longitude coords via HTML5 Geolocation
var checkGeolocation = function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(yourPosition, geo_error);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

// 5.2 Geolocation Error
// Error when the location is not working for some reason
var geo_error = function geo_error(error) {
  'use strict';

  console.log("There was a problem with localization: ", error);
  $('.homepage .masthead__strip h1').css('opacity', '1');
  $('.homepage .masthead__strip p').css('opacity', '1');
};

// 5.3 Geolocation - user's country
var yourPosition = function yourPosition(position) {
  document.your_latitude = position.coords.latitude;
  document.your_longitude = position.coords.longitude;

  // Coords for England for testing purpose
  //document.your_latitude = 51.5239658;
  //document.your_longitude = -0.1840023;

  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(document.your_latitude, document.your_longitude);

  geocoder.geocode({
    'latLng': latlng
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var findCountry = results[results.length - 2],
          countryName,
          regions;
      countryName = findCountry.formatted_address;
      console.log("1 " + countryName);
      countryName = countryName.split(",")[0].toLowerCase().replace(/ /g, "-");
      console.log("2 " + countryName);
      regions = "england northern-ireland scotland wales";
      if (regions.indexOf(countryName) > -1) {
        if (countryName != getCookie("region")) {
          console.log('geocoder finds country');
          setCookie("region", countryName, 365);
          squareBoxesJSON(countryName);
          BannerJSON(countryName);
          logotypeJSON(countryName);
        }
      } else {
        setCookie("region", "default", 365);
      }
    }
  });
};

// 6. Cookies

// 6.1 Sets Cookies
var setCookie = function setCookie(cname, cvalue, exdays) {
  var d = new Date(),
      expires = void 0;

  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
};

// 6.2 Gets Cookies
var getCookie = function getCookie(c_name) {
  var c_start = void 0,
      c_end = void 0;

  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
};

// 7. Region Related

// 7.1 Homepage Square Boxes Data Pull
// Pulls region related data for Square Boxes on homepage
// and uses createBoxes() to change them for proper ones
var squareBoxesJSON = function squareBoxesJSON(countryName) {
  if ($('.homepage').length > 0) {
    jQuery.ajax({
      url: regionJSON,
      dataType: 'json',
      success: function success(json) {
        if (countryName != 'default' && getCookie('region')) {
          createBoxes(json, countryName);
        } else {
          setTimeout(function () {
            $('.homepage .masthead__strip h1').css('opacity', '1');
            $('.homepage .masthead__strip p').css('opacity', '1');
          }, 50);
        }
      }
    });
  }
};

// 7.2 Homepage Banner Data Pull
// Pulls region related data for Banner on homepage
// and uses createBanner() to change it for proper one
var BannerJSON = function BannerJSON(countryName) {
  if ($('.homepage').length > 0) {
    jQuery.ajax({
      url: regionBannerJSON,
      dataType: 'json',
      success: function success(json) {
        if (countryName != 'default' && getCookie('region')) {
          createBanner(json, countryName);
        } else {
          setTimeout(function () {
            $('.homepage .masthead__strip h1').css('opacity', '1');
            $('.homepage .masthead__strip p').css('opacity', '1');
            $('.homepage .masthead__bottom img').css('opacity', '1');
            $('.header__logotype').css('opacity', '1');
          }, 50);
        }
      }
    });
  }
};

// 7.3 Global Logotype Data Pull
// Pulls region related data for Logotype on homepage
// and uses createLogotype() to change it to proper one
var logotypeJSON = function logotypeJSON(countryName) {
  jQuery.ajax({
    url: regionLogotypeJSON,
    dataType: 'json',
    success: function success(json) {
      if (countryName != 'default' && getCookie('region')) {
        createLogotype(json, countryName);
      }
      setTimeout(function () {
        $('.header__logotype').css('opacity', '1');
      }, 50);
    }
  });
};

// 7.4 Homepage Square Boxes Template
// Creates Square Boxes on homepage
var createBoxes = function createBoxes(json, countryName) {
  var printThis = "";

  for (var property in json[countryName]) {
    var linkUrl = json[countryName][property]["link-url"],
        bgImg = json[countryName][property]["bg-img"],
        variant = json[countryName][property]["variant"],
        headline = json[countryName][property]["headline"],
        paragraph = json[countryName][property]["paragraph"];

    printThis += '<a href="' + linkUrl + '" class="square-box__wrapper">\n        <div class="square-box same-height__item ' + variant + '">\n          <div class="square-box__image" style="background-image: url(\'' + bgImg + '\'); background-size: cover;"></div>\n          <div class="square-box__title">\n            ' + headline + '.\n          </div>\n          <p class="square-box__description">' + paragraph + '</p>\n        </div>\n      </a>';
  }

  $('#squareboxes').html('').html(printThis);
  flexboxBehaviour();
};

// 7.5 Homepage Banner Template
// Creates Banner on homepage
var createBanner = function createBanner(json, countryName) {
  var headline = json[countryName]["headline"],
      placeholder = json[countryName]["placeholder"],
      paragraph = json[countryName]["paragraph"],
      image = json[countryName]["image"];

  $('.homepage .masthead__strip h1').html(headline);
  $('.homepage .masthead__strip p').html(paragraph);
  $('.homepage .masthead__strip input').attr('placeholder', placeholder);
  $('.homepage .masthead__bottom img').attr('src', image);
  setTimeout(function () {
    $('.homepage .masthead__strip h1').css('opacity', '1');
    $('.homepage .masthead__strip p').css('opacity', '1');
    $('.homepage .masthead__bottom img').css('opacity', '1');
  }, 50);
};

// 7.6 Global Logotype Template
// Creates Logotype on global
var createLogotype = function createLogotype(json, countryName) {
  var logotype = json[countryName]["img"],
      subtitle = json[countryName]["subtitle"];

  $('.header__logotype img').attr('src', logotype);
  $('.header__logotype--subtitle').html(subtitle);

  setTimeout(function () {
    console.log('settimeout: ' + $('.header__logotype'));
    $('.header__logotype').css('opacity', '1');
  }, 50);
};

// 8. Location Results

// 8.1 Finds "NewDistrictCode" from given postcode
// Gives "NewDistrictCode" from API to use for pulling data
// for particular area after proper postcode is typed in.
// sends "NewDistrictCode" to loadDataLocalArea()
var loadYourLocalArea = function loadYourLocalArea() {
  if ($('#nearestRegistrationOffice').length > 0) {
    jQuery.ajax({
      dataType: "json",
      url: getDC,
      data: "postcode=" + getUrlParameter('query'),
      success: function success(data) {
        data = data.Items;
        if (data[0]) {
          var DistrictCode = "NewDistrictCode";
          if (data[0][DistrictCode] && data[0][DistrictCode].length > 0) {
            loadDataLocalArea(data[0][DistrictCode]);
          }
        }
      }
    });
  }
};

// 8.2 Data for particular postcode
// Pulls data for particular area after NewDistrictCode is
// provided by loadYourLocalArea() and prints it on Location
// Results page
var loadDataLocalArea = function loadDataLocalArea(code) {
  jQuery.ajax({
    url: searchOffice + "?queries_distcode_query=" + code,
    dataType: 'json',
    success: function success(data) {

      // Registration Office
      var officeData = data["registrationOffice"],
          officeDataSize = Object.keys(officeData).length,
          officeDataToAppend = '';

      Object.keys(officeData).map(function (i, e) {
        if (i == "website") {
          officeDataToAppend += '<a href="http://' + officeData[i] + '" target="_blank">' + officeData[i] + '</a>';
        } else if (i == "email") {
          officeDataToAppend += '<a href="mailto:' + officeData[i] + '">' + officeData[i] + '</a><br/>';
        } else if (officeData[i].length > 0) {
          officeDataToAppend += officeData[i] + '<br/>';
        }
      });

      $('#nearestRegistrationOffice').find('.linear-box__address').html('<p>' + officeDataToAppend + '</p>');
      $('#nearestRegistrationOffice').slideDown(150);

      // Upcoming elections
      var upcomingElData = data["elections"],
          upcomingElDataSize = Object.keys(upcomingElData).length,
          upcomingElToAppend = '';

      if (upcomingElDataSize > 0) {
        Object.keys(upcomingElData).map(function (i, e) {
          var _title = '',
              _description = '';
          Object.keys(upcomingElData[i]).map(function (j, e) {
            if (j == "title") {
              _title = upcomingElData[i][j];
            } else {
              _description = upcomingElData[i][j];
            }
          });

          upcomingElToAppend = singleElectionAccordion(_title, _description);
        });
        $('#upcomingElections').find('.panel-group').html(upcomingElToAppend);
        $('#upcomingElections').fadeIn(150);
      } else {
        $('#upcomingElections').fadeIn(150);
      };
    }
  });
};

// 8.3 Upcoming Elections Template
// Template for printing accordion with single upcoming election
// on Location Results page
var singleElectionAccordion = function singleElectionAccordion(title, description) {
  return '\n  <div class="panel panel-default">\n    <div class="panel-heading" role="tab" id="headingOne">\n        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">\n          <h2 data-content=\'+\'>' + title + '</h2>\n        </a>\n    </div>\n    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-8">\n            ' + description + '\n          </div>\n          <div class="col-md-4">\n            <a href="#" class="pull-right button button--shadow">Not registered? <br/>Register Now</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>';
};

$(document).ready(function () {
  flexboxBehaviour();
  mobileViewChanges();
  fullPageBanner();
  loadYourLocalArea();
  checkGeolocation();
  squareBoxesJSON(getCookie("region"));
  BannerJSON(getCookie("region"));
  logotypeJSON(getCookie("region"));
});

$(window).resize(function () {
  flexboxBehaviour();
  mobileViewChanges();
  fullPageBanner();
});

/*
--------------------
Modules
--------------------
*/

(function ($) {
  // This example uses funnelback docs as an example of typeahead functionality
  var baseUrl = 'http://docs.funnelback.com',
      suggestPath = '/s/suggest.json',
      collection = 'funnelback_docs_1240',
      searchInput = $('#typeahead-query');

  searchInput.typeahead({
    name: 'site-search',
    limit: 10,
    remote: {
      url: baseUrl + suggestPath + '?collection=' + collection + '&partial_query=%QUERY',
      dataType: 'jsonp'
    }
  });
})(jQuery);

(function ($) {
  'use strict';

  var changeIcon = function changeIcon() {
    $('.panel').map(function (i, e) {
      if ($(e).find('.panel-collapse').hasClass('in')) {
        $(e).find('h2').attr('data-content', '-');
      } else {
        $(e).find('h2').attr('data-content', '+');
      }
    });
  };

  $('.accordions').on('shown.bs.collapse', function () {
    changeIcon();
  });

  $('.accordions').on('hidden.bs.collapse', function () {
    changeIcon();
  });

  $(document).ready(function () {
    var hash = window.location.hash.substr(1);

    changeIcon();
    $('.panel').collapse('hide');
    $('#collapse' + hash).collapse('show');
  });
})(jQuery);

(function ($) {
  'use strict';

  var closeButton = $('.cookies-message__close'),
      cookiesMessage = $('.cookies-message'),
      ifCookie = readCookie('amv-cookies-notification');

  if (!ifCookie) {
    cookiesMessage.show();
  }

  closeButton.on('click', function () {
    cookiesMessage.slideUp(200);
    createCookie('amv-cookies-notification', 'accepted', 31);
  });

  function createCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }
})(jQuery);

(function ($) {
  'use strict';

  $("#form_email_220248").validate({
    errorClass: 'input--error',
    validClass: 'input--success',
    rules: {
      "q220248:q1": "required",
      "q220248:q2": {
        number: true
      },
      "q220248:q3": {
        required: true,
        email: true
      },
      "q220248:q5": "required"
    },
    messages: {
      "q220248:q1": "Please enter this field",
      "q220248:q2": {
        number: "Please enter proper phone number"
      },
      "q220248:q3": {
        required: "Please enter this field",
        email: "Please enter proper email address"
      },
      "q220248:q5": "Please enter this field"
    }
  });
})(jQuery);

(function ($) {

  // Prevent Default behaviour of submit button until the input field is open
  // removes class blocking default behaviour after input is ready to type text
  var searchOpen = function searchOpen() {
    var searchButton = $('.header__search button'),
        searchInput = $('.header__search input');

    searchButton.on('click', function (event) {
      if (searchButton.hasClass('not-active') && $(window).width() > 768) {
        event.preventDefault();
        searchInput.fadeIn();
        searchButton.removeClass('not-active');
        searchInput.focus();
      }
    });
  };

  // Main navigation with .5s delay on mouseover
  var navigation = function navigation() {
    var navigation = $('.header__navigation'),
        firstLevel = $('.header__navigation--firstlevel li'),
        firstLevelLink = $('.header__navigation--mainlink'),
        secondLevel = $('.header__navigation--secondlevel'),
        mobileButton = $('.header__mobile--button'),
        delay = 300;

    var setTimeoutConst = void 0;

    if ($(window).width() > 768) {
      firstLevel.hover(function () {
        var _this = $(this);
        setTimeoutConst = setTimeout(function () {
          _this.find('ul').show();
        }, delay);
      }, function () {
        clearTimeout(setTimeoutConst);
        $(this).find('ul').hide();
      });
    }

    mobileButton.on('click', function () {
      navigation.slideToggle(200);
    });

    firstLevelLink.on('click', function (e) {
      console.log(e);
      if ($(window).width() < 769) {
        event.preventDefault();
        secondLevel.slideUp();
        if ($(this).hasClass('active')) {
          $(this).siblings('ul').slideUp();
          $(this).removeClass('active');
        } else {
          $(this).siblings('ul').slideDown();
          $(this).addClass('active');
        }
      }
    });
  };

  var showNav = debounce(function () {
    if ($(window).width() > 768) {
      $('.header__navigation').show();
    }
  });

  // Functions initialization
  $(document).ready(function () {
    searchOpen();
    navigation();
  });

  $(window).resize(function () {
    showNav();
  });
})(jQuery);

(function ($) {
  'use strict';

  var postcodeForm = $('#postcodeForm'),
      postcodeInput = postcodeForm.find('input');
  var postcodeValue = postcodeInput.val();

  // Checks if postcode is valid before it will submit form
  var postcodeValidation = function () {
    postcodeForm.find('button').on('click', function (event) {
      var postcode = postcodeInput.val();
      postcodeCheck(postcode, true);
      event.preventDefault();
    });

    postcodeForm.find('input').keyup(function (event) {
      if (postcodeValue != postcodeInput.val().length) {

        setTimeout(function () {
          var postcode = postcodeInput.val();
          postcodeCheck(postcode, false);
        }, 300);
      }
      postcodeValue = postcodeInput.val().length;
    });
  }();

  // Ajax request to MapIt API for checking if postcode is correct
  var postcodeCheck = function postcodeCheck(postcode, send) {
    $.ajax({
      url: 'https://mapit.mysociety.org/postcode/' + postcode,
      dataType: 'json',
      success: function success(data) {
        if (send) {
          postcodeForm.submit();
        }
        postcodeForm.removeClass('form-error');
      },
      error: function error() {
        postcodeForm.addClass('form-error');
      }
    });
  };
})(jQuery);

(function ($) {
  'use strict';

  $('.masthead__slidedown a').on('click', function () {
    $('#content').ScrollTo();
  });
})(jQuery);

(function ($) {
  'use strict';
})(jQuery);
(function ($) {
  'use strict';
})(jQuery);
//# sourceMappingURL=global.js.map
