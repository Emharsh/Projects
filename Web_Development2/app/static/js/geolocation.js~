function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

if (typeof(Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  window.alter("Local storage is not supported");
}

// Store
sessionStorage.setItem("module", "COMP1021");
// Retrieve
document.getElementById("result").innerHTML = sessionStorage.getItem("module");

if (typeof(Storage) !== "undefined") {
  // Code for localStorage/sessionStorage.
} else {
  window.alter("Local storage is not supported");
}

// Retrieve
document.getElementById("result").innerHTML = sessionStorage.getItem("module");

if (localStorage.clickCountLocal) {
  document.getElementById("resultsession").innerHTML = "You have clicked the button " + localStorage.clickCountSession + " time(s).";
} else {

  localStorage.setItem("clickCountSession", 0);
}

if (localStorage.clickCountLocal) {
  document.getElementById("resultlocal").innerHTML = "You have clicked the button " + localStorage.clickCountLocal + " time(s).";
} else {
  localStorage.setItem("clickCountLocal", 0);
}

function clickCounterLocal() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickCountLocal) {
      localStorage.clickCountLocal = Number(localStorage.clickCountLocal) + 1;
    } else {
      localStorage.clickCountLocal = 1;
    }
    document.getElementById("resultlocal").innerHTML = "You have clicked the button " + localStorage.clickCountLocal + " time(s).";
  } else {
    document.getElementById("resultlocal").innerHTML = "Thw browser does not support local storage";
  }
}

function clickCounterSession() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickCountSession) {
      localStorage.clickCountSession = Number(localStorage.clickCountSession) + 1;
    } else {
      localStorage.clickCountSession = 1;
    }
    document.getElementById("resultsession").innerHTML = "You have clicked the button " + localStorage.clickCountSession + " time(s).";
  } else {
    document.getElementById("resultsession").innerHTML = "Thw browser does not support local storage";
  }
}
