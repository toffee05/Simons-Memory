let interval, lvl = 3, xTemp = 0, yTemp = 0, colorTemp = "white", i = 0, i2 = 0, i3 = 0, score = 0, locatorTemp = [-1, -1, "temp"], sq = 0;
badTile = 0, newLvl = false, rotate = 0, click = new Audio("../assets/audio/click.mp3"), flag = false,
locator = [...Array(lvl)].map(e => Array(lvl));

const sleep = (delay) => new Promise((done) => setTimeout(done, delay));

$(".home").click(function() {
	location.href = "../index.html";
});
							
$(".start").click(function() {
	sq++;
	start();
});

function start() {
	$("#lvl span").html(lvl - 2);
	if(sq % 2 == 1 || newLvl == true) {
		$("img").attr("src", "../assets/images/badTile.png");
		$(".start").html("Quit");
	}
	else {
		lose();
		return;
	}
	randomize();
	i2 = 0;
	interval = setInterval(draw, 1000 / 3 - 50);
	setTimeout(user, 1000 / 3 * lvl + 10);
}
			
function randomize() {
	(function () { locator = [...Array(lvl)].map(e => Array(lvl)); i = 0; badTile = 0; }());
	for(i = 0; i < lvl;) {
		xTemp = Math.floor(Math.random() * 5);
		yTemp = Math.floor(Math.random() * 5);
		colorTemp = Math.floor(Math.random() * 5);
		if(typeof(locator[i][0]) === 'undefined' && (locatorTemp[0] !== xTemp && locatorTemp[1] !== yTemp)) {
			if(colorTemp > 2 && badTile < lvl - 1) {
				locator[i] = [(xTemp + 1), (yTemp + 1), "../assets/images/badTile.png"];
				badTile++;
			}
			else
				locator[i] = [(xTemp + 1), (yTemp + 1), "../assets/images/goodTile.png"];
			locatorTemp = locator[i];
			i++;
		}
	}
	(function () { i = 0; }());
}
			
function draw() {
	if(sq % 2 == 0)
		return;
	$(".x" + locator[i2][0] + ".y" + locator[i2][1] + " .cellInner .cellBack img").attr("src", locator[i2][2]);
	$(".x" + locator[i2][0] + ".y" + locator[i2][1] + " .cellInner").addClass("flipActivate");
	setTimeout(function() {
		$(".x" + locator[i2][0] + ".y" + locator[i2][1] + " .cellInner").removeClass("flipActivate");
	}, 200);
	(async function() {
		await sleep(200);
		i2++;
	}());
	if(i2 == lvl - 1) {
		clearInterval(interval);
		(function () { i = 0; }());
	}
}
			
function user() {
	i3 = 0;
	$(".cell").click(function(e) {
		while(!locator[i][2].includes("goodTile")) 
			i++;
		e.stopImmediatePropagation();
		click.pause();
		click.currentTime = 0;
		click.play();
		inputTemp = $(this).attr("class").split(/\s+/);
		inputTemp.shift();
		input = [parseInt(inputTemp[0].charAt(1)), parseInt(inputTemp[1].charAt(1))];
		$("#points span").html(++score);
		console.log(i3);
		
		if(input[0] != locator[i][0] || input[1] != locator[i][1]) {
			sq = 0;
			newLvl = false;
			alert("You Lost");
			lose();
		}
		else if(i3 + 1 == lvl - badTile) {
			alert("Nice! Next Level.");
			win();
		}
		else
			i3++;
		i++;
	});
}
			
function win() {
	$(".cellInner").removeClass("flipActivate");
	lvl++;
	newLvl = true;
	start(sq, true);
}
			
function lose() {
	$("img").removeAttr("src");
	$(".cellInner").removeClass("flipActivate");
	$(".start").html("Start");;
	alert("You reached lvl " + (lvl - 2));
	$("#lvl span").html(1);
	$("#points span").html(0);
	lvl = 3, score = 0;
	$(".cell").off();
}