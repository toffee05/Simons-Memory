let interval, lvl = 3, xTemp = 0, yTemp = 0, colorTemp = "white", i = 0, i2, score = 0, locatorTemp = [-1, -1, "temp"], badTile = 0, newLvl = false,
click = new Audio("../assets/audio/click.mp3"),
locator = [...Array(lvl)].map(e => Array(lvl));

function start(sq, newLvl) {
	$("#lvl span").html(lvl - 2);
	if(sq % 2 == 1 || newLvl == true) {
		$(".start").html("Quit");
	}
	else {
		lose();
		return;
	}
	randomize();
	i2 = i;
	interval = setInterval(draw, 1000 / 3);
	
	setTimeout(user, 1000 / 3 * lvl + 100);
}
			
function randomize() {
	(function () { locator = [...Array(lvl)].map(e => Array(lvl)); i = 0; badTile = 0; }());
	for(i = 0; i < lvl;) {
		xTemp = Math.floor(Math.random() * 5);
		yTemp = Math.floor(Math.random() * 5);
		colorTemp = Math.floor(Math.random() * 5);
		if(typeof(locator[i][0]) === 'undefined' && (locatorTemp[0] !== xTemp && locatorTemp[1] !== yTemp)) {
			if(colorTemp > 2 && badTile < lvl - 1) {
				locator[i] = [xTemp, yTemp, "../assets/images/badTile.png"];
				badTile++;
			}
			else
				locator[i] = [xTemp, yTemp, "../assets/images/goodTile.png"];
			locatorTemp = locator[i];
			i++;
		}
	}
	(function () { i = 0; }());
}
			
function draw() {
	if(sq % 2 == 0)
		return;
	$(".x" + (locator[i2][0] + 1) + ".y" + (locator[i2][1] + 1) + " img").attr("src", locator[i2][2]);
	$(".x" + (locator[i2][0] + 1) + ".y" + (locator[i2][1] + 1) + " img").fadeIn(50);
	$(".x" + (locator[i2][0] + 1) + ".y" + (locator[i2][1] + 1) + " img").show();
	setTimeout(function(locatorP, i3) {
		$(".x" + (locatorP[i3][0] + 1) + ".y" + (locatorP[i3][1] + 1) + " img").removeAttr("src");
		$(".x" + (locatorP[i3][0] + 1) + ".y" + (locatorP[i3][1] + 1) + " img").fadeOut(50);
		$(".x" + (locatorP[i3][0] + 1) + ".y" + (locatorP[i3][1] + 1) + " img").hide();
	}.bind(null, locator, i2), 1000 / 3.2);
	i2++;
	if(i2 == lvl) {
		clearInterval(interval);
		(function () { i = 0; }());
	}
}
			
function user() {
	i2 = 0;
	$(".cell").click(function(e) {
		while(!locator[i][2].includes("goodTile")) 
			i++;
		e.stopImmediatePropagation();
		click.pause();
		click.currentTime = 0;
		click.play();
		inputTemp = $(this).attr("class").split(/\s+/);
		inputTemp.shift();
		input = [parseInt(inputTemp[0].charAt(1)) - 1, parseInt(inputTemp[1].charAt(1)) - 1];
		$("#points span").html(++score);
		i2++;
		if(input[0] != locator[i][0] || input[1] != locator[i][1]) {
			sq = 0;
			newLvl = false;
			alert("You Lost");
			lose();
		}
		else if(i2 == lvl - badTile) {
			alert("Nice! Next Level.");
			win();
		}
		i++;
	});
}
			
function win() {
	lvl++;
	newLvl = true;
	start(sq, true);
}
			
function lose() {
	$(".start").html("Start");;
	alert("You reached lvl " + (lvl - 2));
	$("#lvl span").html(1);
	$("#points span").html(0);
	lvl = 3, score = 0;
	$(".cell").off();
}