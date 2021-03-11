var interval, lvl = 3, color, xTemp, yTemp, colorTemp, i = 0, i2, score = 0,
click = new Audio("../assets/audio/click.mp3");
locator = [...Array(lvl)].map(e => Array(lvl));
			
function start() {
	$("#lvl span").html(lvl - 2);
	randomize();
	i2 = i;
	interval = setInterval(draw, 1000 / 3);
	user();
}
			
function randomize() {
	(function () { locator = [...Array(lvl)].map(e => Array(lvl)); i = 0; }());
	for(i = 0; i < lvl;) {
		xTemp = Math.floor(Math.random() * 5);
		yTemp = Math.floor(Math.random() * 5);
		colorTemp = Math.floor(Math.random() * 4);
		if(typeof(locator[i][0]) === 'undefined') {
			if(colorTemp > 2)
				locator[i] = [xTemp, yTemp, "../assets/images/badTile.png"];
			else
				locator[i] = [xTemp, yTemp, "../assets/images/goodTile.png"];
			i++;
		}
	}
	(function () { i = 0; }());
}
			
function draw() {
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
	$(".cell").click(function(e) {
		e.stopImmediatePropagation();
		click.pause();
		click.currentTime = 0;
		click.play();
		inputTemp = $(this).attr("class").split(/\s+/);
		inputTemp.shift();
		input = [parseInt(inputTemp[0].charAt(1)) - 1, parseInt(inputTemp[1].charAt(1)) - 1];
		locator[i].pop();
		$("#points span").html(++score);
		if(input[0] != locator[i][0] || input[1] != locator[i][1]) {
			alert("You Lost");
			lose();
		}
		else if(i == lvl - 1) {
			alert("Nice! Next Level.");
			win();
		}
		i++;
	});
}
			
function win() {
	lvl++;
	(function () { locator = [...Array(lvl)].map(e => Array(lvl)); i = 0; }());
	start();
}
			
function lose() {
	alert("You reached lvl " + (lvl - 2));
	$("#points span").html(0);
	lvl = 3, score = 0;
	(function () { locator = [...Array(lvl)].map(e => Array(lvl)); i = 0; }());
	$(".cell").off();
}