"use strict";

window.addEventListener("load", function() {

    //time stuff
    const d = new Date();
    let time = d.getHours();
    let timeMinutes = d.getMinutes();
    if(timeMinutes < 10) {
        timeMinutes = "0" + timeMinutes;
    }
    time = time + ":" + timeMinutes;
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let year = d.getFullYear();
    let month = d.getMonth();
    month = months[month];
    let weekday = d.getDay();
    weekday = weekdays[weekday];
    let day = d.getDate();
    let date = weekday + ", " + day + " " + month + " " + year;
    document.getElementById("time").innerHTML = time;
    document.getElementById("date").innerHTML = date;

    //draggable thingies
    dragElement(document.getElementById("divPi"));
    dragElement(document.getElementById("divKpoovakan"));
    dragElement(document.getElementById("divMusic"));

    //hide divs onload
    hideDiv("Pi");
    hideDiv("Kpoovakan");
    hideDiv("Music");

    //event listeners to open apps
    document.getElementById("pi").addEventListener("click", function() {
        document.getElementById("divPi").style.display = "block";
        hideHint();
    });
    document.getElementById("cool").addEventListener("click", function() {
        document.getElementById("divKpoovakan").style.display = "block";
        hideHint();
    });
    document.getElementById("music").addEventListener("click", function() {
        document.getElementById("divMusic").style.display = "block";
        hideHint();
    });
});


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function hideHint() {
    document.getElementById("hint").setAttribute("class", "hintHide");
    document.getElementById("hint").addEventListener("animationend", function() {
        document.getElementById("hint").remove();
    });
}

function hideDiv(divName) {
    document.getElementById("div"+divName).style.display = "none";
}