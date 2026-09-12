"use strict";
setInterval(resetTime, 1000);

window.addEventListener("load", function() {

    //time stuff
    resetTime();
    document.getElementById("settingsTime").value = window.localStorage.getItem("piwebosTime");
    document.getElementById("settingsAudio").value = window.localStorage.getItem("piwebosAudio");

    // date stuff
    const d = new Date();
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let year = d.getFullYear();
    let month = d.getMonth();
    month = months[month];
    let weekday = d.getDay();
    weekday = weekdays[weekday];
    let day = d.getDate();
    let date = weekday + ", " + day + " " + month + " " + year;
    document.getElementById("date").innerHTML = date;

    //draggable thingies
    dragElement(document.getElementById("divPi"));
    dragElement(document.getElementById("divKpoovakan"));
    dragElement(document.getElementById("divMusic"));
    dragElement(document.getElementById("divDesmos"));
    dragElement(document.getElementById("divMap"));
    dragElement(document.getElementById("divNotepad"));
    dragElement(document.getElementById("divFlight"));
    dragElement(document.getElementById("divVideo"));
    dragElement(document.getElementById("divSettings"));

    //event listeners to open apps
    document.getElementById("settings").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divSettings").style.display;
        document.getElementById("divSettings").style.display = switchDisplay[thisCurrent];
        hideHint();
    });
    document.getElementById("pi").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divPi").style.display;
        document.getElementById("divPi").style.display = switchDisplay[thisCurrent];
        hideHint();
    });
    document.getElementById("cool").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divKpoovakan").style.display;
        document.getElementById("divKpoovakan").style.display = switchDisplay[thisCurrent];
        hideHint();
    });
    document.getElementById("music").addEventListener("click", function() {
        clickAudio();
        /*document.getElementById("divMusic").style.display = "block";
        hideHint();*/
        window.location.href = "/chopinetudes";
    });
    document.getElementById("bible").addEventListener("click", function() {
        clickAudio();
        window.location.href = "https://prs.app";
        hideHint();
    });
    document.getElementById("desmos").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divDesmos").style.display;
        document.getElementById("divDesmos").style.display = switchDisplay[thisCurrent];
        hideHint();
    });
    document.getElementById("file").addEventListener("click", function() {
        clickAudio();
        window.location.href = globalThis.hrefFile;
        hideHint();
    });
    document.getElementById("flight").addEventListener("click", function() {
        clickAudio();
        window.location.href = "https://map.opensky-network.org/";
        hideHint();
    });
    document.getElementById("mail").addEventListener("click", function() {
        clickAudio();
        window.location.href = globalThis.hrefMail;
        hideHint();
    });
    document.getElementById("map").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divMap").style.display;
        document.getElementById("divMap").style.display = switchDisplay[thisCurrent];
        hideHint();
    });
    document.getElementById("notepad").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divNotepad").style.display;
        document.getElementById("divNotepad").style.display = switchDisplay[thisCurrent];
        document.getElementById("appNotepad").focus();
        hideHint();
    });
    document.getElementById("turbowarp").addEventListener("click", function() {
        clickAudio();
        window.location.href = "https://turbowarp.org/editor";
        hideHint();
    });
    document.getElementById("web").addEventListener("click", function() {
        clickAudio();
        window.location.href = "/stickytab";
        hideHint();
    });
    document.getElementById("video").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divVideo").style.display;
        document.getElementById("divVideo").style.display = switchDisplay[thisCurrent];
        if(thisCurrent == "none") {
            document.getElementById("divVideoElements").innerHTML = `<iframe src="https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1&amp;loop=1&amp;modestbranding=1&amp;controls=0&amp;rel=0" title="muahahahahaha" frameborder="0" allow="autoplay; encrypted-media;" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="" loadinz="eager"></iframe><p><a href="https://youtube.com">tap to open youtube in browser</a></p>`;
        } else {
            document.getElementById("divVideoElements").innerHTML = "";
        }
        hideHint();
    });

    // setting up localStorage link settings
    globalThis.hrefFile = window.localStorage.getItem("piwebosHrefFile");
    globalThis.hrefMail = window.localStorage.getItem("piwebosHrefMail");
    globalThis.hrefMap = window.localStorage.getItem("piwebosHrefMap");
    if(globalThis.hrefFile == null || globalThis.hrefFile == undefined || globalThis.hrefFile == "") {
        globalThis.hrefFile = "https://drive.google.com";
    }
    if(globalThis.hrefMail == null || globalThis.hrefMail == undefined || globalThis.hrefMail == "") {
        globalThis.hrefMail = "https://mail.google.com";
    }
    if(globalThis.hrefMap == null || globalThis.hrefMap == undefined || globalThis.hrefMap == "") {
        globalThis.hrefMap = "https://maps.google.com";
    }
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

function resetTime() {
    const d = new Date();
    var time = d.getHours();
    if(window.localStorage.getItem("piwebosTime") == "sanity" && time > 12) {
        var time = time - 12;
    }
    let timeMinutes = d.getMinutes();
    if(timeMinutes < 10) {
        timeMinutes = "0" + timeMinutes;
    }
    var time = time + ":" + timeMinutes;
    document.getElementById("time").innerHTML = time;
}

function hideHint() {
    document.getElementById("hint").setAttribute("class", "hintHide");
    document.getElementById("hint").addEventListener("animationend", function() {
        document.getElementById("hint").style.display = "none";
    });
}

function hideDiv(divName) {
    clickAudio();
    document.getElementById("div"+divName).style.display = "none";
    if(divName == "Video") {
        document.getElementById("divVideoElements").innerHTML = "";
    }
}

function piDigits() {
    document.getElementById("piGame").style.display = "none";
    document.getElementById("piDigits").style.display = "block";
}

function piGame() {
    document.getElementById("piDigits").style.display = "none";
    document.getElementById("piGame").style.display = "block";
}

function settingsMail(thisElement) {
    if(thisElement.value == "" || thisElement.value == undefined || thisElement.value == null) {
        return;
    } else if (!(thisElement.value.includes("http"))) {
        alert("please include the HTTP or HTTPS in your URL");
        return;
    } else {
        window.localStorage.setItem("piwebosHrefMail", thisElement.value);
        globalThis.hrefMail = thisElement.value;
        alert("preferences updated!");
    }
}

function settingsFile(thisElement) {
    if(thisElement.value == "" || thisElement.value == undefined || thisElement.value == null) {
        return;
    } else if (!(thisElement.value.includes("http"))) {
        alert("please include the HTTP or HTTPS in your URL");
        return;
    } else {
        window.localStorage.setItem("piwebosHrefFile", thisElement.value);
        globalThis.hrefFile = thisElement.value;
        alert("preferences updated!");
    }
}

function settingsTime(thisElement) {
    window.localStorage.setItem("piwebosTime", thisElement.value);
    resetTime();
}

function settingsAudio(thisElement) {
    window.localStorage.setItem("piwebosAudio", thisElement.value);
}

function clickAudio() {
    const preferences = window.localStorage.getItem("piwebosAudio");
    if(preferences == "off") {
        return;
    }
    const effect = new Audio("snap.wav");
    effect.play();
}