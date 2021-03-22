let interval, lvl = 3, xTemp = 0, yTemp = 0, colorTemp = "white", i = 0, i2 = 0, i3 = 0, score = 0, locatorTemp = [-1, -1, "temp"], sq = 0;
badTile = 0, rotate = 0, click = new Audio("../assets/audio/click.mp3"),
locator = [...Array(lvl)].map(e => Array(lvl));

$(window).on("load", function() {
	setTimeout(function() {
		$(".loadScreen").css("opacity", 0);
		setTimeout(function() {
			$(".loadScreen").hide();
		}, 400);
	}, 500);
});

$(".start").click(function() {
	sq++;
	start();
});

function start() {
	$("#lvl span").html(lvl - 2);
	if(sq % 2 == 1) {
		$("img").attr("src", "../assets/images/badTile.png");
		$(".start").html("Quit");
	}
	else {
		lose();
		return;
	}
	randomize();
	i2 = 0;
	interval = setInterval(draw, 1000 / 3 + 10);
	i3 = 0;
	setTimeout(user, 1000 / 3 * lvl + 20);
}
			
function randomize() {
	(function () { locator = [...Array(lvl)].map(e => Array(lvl)); i = 0; badTile = 0; }());
	for(i = 0; i < lvl;) {
		xTemp = Math.floor(Math.random() * 5) + 1;
		yTemp = Math.floor(Math.random() * 5) + 1;
		colorTemp = Math.floor(Math.random() * 4);
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
	$(".x" + locator[i2][0] + ".y" + locator[i2][1] + " .cellInner .cellBack img").attr("src", locator[i2][2]);
	$(".x" + locator[i2][0] + ".y" + locator[i2][1] + " .cellInner").addClass("flipActivate");
	setTimeout(function() {
		$(".x" + locator[i2][0] + ".y" + locator[i2][1] + " .cellInner").removeClass("flipActivate");
		i2++;
	}, 200);
	
	if(i2 == lvl - 1) {
		clearInterval(interval);
	}
}
			
function user() {
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
	
		if(input[0] == locator[i][0] && input[1] == locator[i][1]){
			i3++;
			$("#points span").html(++score);
			if(i3 == lvl - badTile)
				modal(true);
		}
		else if(input[0] != locator[i][0] || input[1] != locator[i][1]) {
			sq = 0;
			newLvl = false;
			modal(false);
		}
		i++;
	});
}
			
function win() {
	$(".modal").css("display", "none");
	$(".modal-content").removeClass("drop");
	$(".proceed").off("click");
	$(".quit").off("click");
	$(".close").off("click");
	i = 0, i2 = 0, i3 = 0;
	$(".cellInner").removeClass("flipActivate");
	lvl++;
	start();
}
			
function lose() {
	$(".modal").css("display", "none");
	$(".modal-content").removeClass("drop");
	$(".proceed").off("click");
	$(".quit").off("click");
	$(".close").off("click");
	i = 0, i2 = 0, i3 = 0;
	$("img").removeAttr("src");
	$(".cellInner").removeClass("flipActivate");
	$(".start").html("Start");;
	$("#lvl span").html(1);
	$("#points span").html(0);
	lvl = 3, score = 0, sq = 0;
	$(".cell").off();
}

function modal(wl) {
	if(wl)
		$(".modal-content p").html("You Have Safely Ascended a Level. Proceed?");
	else
		$(".modal-content p").html("You Have Died. You Reached <b>Level " + (lvl - 2) + "</b> with <b>" + score + " Point(s).</b>");
	
	$(".modal").css("display", "flex");
	$(".modal-content").addClass("drop");
	
	if(wl) {
		$(".close").css("display", "none");
		$(".continue").css("display", "block");
		
		$(".proceed").click(function() {
			win();
		});

		$(".quit").click(function() {
			modal(false);
		});
	}
	
	else {
		$(".close").css("display", "flex");
		$(".continue").css("display", "none");
		
		$(".close").click(function() {
			lose();
		});
	}
}