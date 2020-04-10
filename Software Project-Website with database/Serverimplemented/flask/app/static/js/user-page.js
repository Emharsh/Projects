function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

//auto expand textarea
function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}

function reveal(name){
  document.getElementById(name).style.display = "block";
  document.getElementById(name).focus();
}

function hide(name){
  document.getElementById(name).style.display = "none";
}

function centres(clickBtn, nextBtn,clickEle, nextEle) {
  hide(clickBtn);
  hide(clickEle);
  reveal(nextBtn);
  reveal(nextEle);
/*/
  if (name === "showCentres"){
    hide(name);
    hide("createACentre");
    reveal("addCentres");
    reveal("showDCentres");
  }
  if (name ===  "addCentres"){
    hide(name);
    hide("showDCentres");
    reveal("showCentres");
    reveal("createACentre");
  }
/*/
}
/*
function events(name){
  reveal(name);
  hide()
}
*/
