"use strict";



// basic utilities

setInterval(resetTime, 1000);

window.addEventListener("load", function() {

    // notepad stuff
    document.getElementById("appNotepad").value = window.localStorage.getItem("piwebosNotepad");

    // audio stuff
    document.getElementById("settingsAudio").value = window.localStorage.getItem("piwebosAudio");
    if(document.getElementById("settingsAudio").value == "") {
        document.getElementById("settingsAudio").value = "on";
    }
    document.getElementById("settingsPiAudio").value = window.localStorage.getItem("piwebosPiAudio");
    if(document.getElementById("settingsPiAudio").value == "") {
        document.getElementById("settingsPiAudio").value = "snap";
    }
    globalThis.thisDigit = -1;

    // time stuff
    resetTime();
    document.getElementById("settingsTime").value = window.localStorage.getItem("piwebosTime");
    if(document.getElementById("settingsTime").value == "") {
        document.getElementById("settingsTime").value = "sanity";
    }

    // date stuff
    resetDate();

    // draggable thingies
    dragElement(document.getElementById("divPi"));
    dragElement(document.getElementById("divKpoovakan"));
    dragElement(document.getElementById("divMusic"));
    dragElement(document.getElementById("divDesmos"));
    dragElement(document.getElementById("divMap"));
    dragElement(document.getElementById("divNotepad"));
    dragElement(document.getElementById("divFlight"));
    dragElement(document.getElementById("divVideo"));
    dragElement(document.getElementById("divSettings"));

    // event listeners to open apps
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
        gamesMenu();
        hideHint();
    });
    document.getElementById("music").addEventListener("click", function() {
        clickAudio();
        const switchDisplay = { block:"none", none:"block" };
        var thisCurrent = document.getElementById("divMusic").style.display;
        document.getElementById("divMusic").style.display = switchDisplay[thisCurrent];
        hideHint();
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
    if(time == "0:00") {
        resetDate();
    }
}

function resetDate() {
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
    } else if(divName == "Kpoovakan") {
        gamesMenu();
    }
}



// functions for pi app

function piDigits() {
    document.getElementById("piGame").style.display = "none";
    document.getElementById("piDigits").style.display = "block";
}

function piGame() {
    document.getElementById("piDigits").style.display = "none";
    document.getElementById("piGame").style.display = "block";
}



// functions for settings app

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

function settingsPiAudio(thisElement) {
    window.localStorage.setItem("piwebosPiAudio", thisElement.value);
}



// functions to play audio sound effects

function clickAudio() {
    const toPlay = window.localStorage.getItem("piwebosPiAudio");
    if(toPlay == "pi") {
        piAudio();
        return;
    }
    const preferences = window.localStorage.getItem("piwebosAudio");
    if(preferences == "off") {
        return;
    }
    const effect = new Audio("audio/snap.wav");
    effect.play();
}

function piAudio() {
    const digits = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989";
    globalThis.thisDigit = thisDigit + 1;
    const digitPlay = digits[thisDigit];
    if(digitPlay == ".") {
        const toPlay = new Audio("audio/point.wav");
        toPlay.play();
    } else {
        const toPlay = new Audio(`audio/${digitPlay}.wav`);
        toPlay.play();
    }
}



// functions for games app

function gamesMenu() {
    const menu = `
    <div class="gamesDiv">
        <a href="javascript:void(0);" class="games" onclick="games('1210100138')"><img src="https://uploads.scratch.mit.edu/get_image/project/1210100138_480x360.png"></a>
        <a href="javascript:void(0);" class="games" onclick="games('1285004431')"><img src="https://uploads.scratch.mit.edu/get_image/project/1285004431_480x360.png"></a>
    </div><br><div class="gamesDiv">
        <a href="javascript:void(0);" class="games" onclick="games('1351487347')"><img src="https://uploads.scratch.mit.edu/get_image/project/1351487347_480x360.png"></a>
        <a href="javascript:void(0);" class="games" onclick="games('1268780260')"><img src="https://uploads.scratch.mit.edu/get_image/project/1268780260_480x360.png"></a>
    </div>
    `;
    document.getElementById("gamesContent").innerHTML = menu;
}

function games(projectID) {
    if(projectID == "1210100138") {
        var element = `<div style="display: block; position: relative;"><iframe src="https://turbowarp.org/${projectID}/embed" allowfullscren="" class="gameEmbed" loading="lazy" style="border: none; vertical-align: top; position: relative;"></iframe><p style="position: absolute; top: 13px; right: 0; margin: 0;"><a href="javascript:void(0);" onclick="gamesMenu()">return to menu</a> or <a href="/harvest">play in fullscreen</a></p></div>`;
    } else {
        var element = `<div style="display: block; position: relative;"><iframe src="https://turbowarp.org/${projectID}/embed" allowfullscren="" class="gameEmbed" loading="lazy" style="border: none; vertical-align: top; position: relative;"></iframe><p style="position: absolute; top: 13px; right: 0; margin: 0;"><a href="javascript:void(0);" onclick="gamesMenu()">return to menu</a> or <a href="https://scratch.mit.edu/projects/${projectID}/fullscreen/">play in fullscreen</a></p></div>`;
    }
    document.getElementById("gamesContent").innerHTML = element;
}



// functions for notepad app

function notepad(thisElement) {
    window.localStorage.setItem("piwebosNotepad", thisElement.value);
}