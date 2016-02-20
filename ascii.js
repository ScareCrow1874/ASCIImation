/*	This Javascript file manages the page function including starting
	and ending animation, changing animation, changing font size, 
	changing play speed, setting custom font. 
*/

(function(){ //a module for everything
	"use strict";

	var speed = 250;
	var interval = null;
	var count = 0;
	var content = "";

	window.onload = function(){ //handling events when the page is loaded
		document.getElementById("anime").onchange = chooseAnime;
		document.getElementById("fontsize").onchange = chooseFont;
		document.getElementById("start").onclick = startAnime;
		document.getElementById("stop").onclick = endAnime;
		var velocity = document.querySelectorAll("fieldset input");
		for (var i = 0; i < velocity.length; i++) {
			velocity[i].onclick = chooseSpeed;
		}
	};

	function chooseAnime() { //chooses which animation to display
		var anime  = document.querySelector("#anime");
		document.getElementById("mytextarea").value = ANIMATIONS[anime.value];
	}

	function chooseFont() { //choose the font for characters
		var myfont = document.querySelector("#fontsize");
		if (myfont.value == "custom") { //user chooses custom font, prompt for font
			var custom = prompt("Font size to use? (e.g. 10pt)");
			document.getElementById("mytextarea").style.fontSize = custom;
		} else {
			document.getElementById("mytextarea").style.fontSize = myfont.value;
		}
	}

	function startAnime() { //starts the animation
		document.getElementById("stop").disabled = false;
		document.getElementById("start").disabled = true;
		document.getElementById("anime").disabled = true;
		content = document.getElementById("mytextarea").value;
		buildintv(); //to make first frame show immediately
		interval = setInterval(buildintv, speed);
	}

	function endAnime() { //ends the animation
		clearInterval(interval);
		count = 0;
		document.getElementById("start").disabled = false;
		document.getElementById("stop").disabled = true;
		document.getElementById("anime").disabled = false;
		document.getElementById("mytextarea").value = content;
	}

	function chooseSpeed() { //chooses the speed of display
		clearInterval(interval);
		speed = this.value;
		if (document.getElementById("start").disabled) {
			interval = setInterval(buildintv, speed);
		}
	}

	function buildintv() { //displays each frame
		var frames = content.split("=====\n"); //separate frames
		document.getElementById("mytextarea").value = frames[count];
		count++;
		if (count == frames.length) { //replays when reaches the last frame
			count = 0;
		}
	}
})();