window.onload = init;
window.onkeydown = onKeyDown;
var cw = 1024, ch = 768;
var context;
var bg;

function init() {
	document.getElementById("gameCanvas").style.zIndex = 20000;
	var canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");

	bg = addImg("../img/background.jpg");

	setInterval(gameLoop, 1000 / 60);

	lastTime = Date.now();
	deltaTime = 0;

	plankter = new plankterObj();
	plankter.init();

	shrimp = new shrimpObj();
	shrimp.init();

	smallFish = new smallfishObj();
	smallFish.init();

	shark = new sharkObj();
	shark.init();

	plankter2 = new plankterObj();
	plankter2.init();
	plankter2.createPlankter(20);

	shrimp2 = new shrimpObj();
	shrimp2.init();
	shrimp2.createShrimp(15);

	smallfish2 = new smallfishObj();
	smallfish2.init();
	smallfish2.createSmallfish(8);

	shark2 = new sharkObj();
	shark2.init();
	shark2.createShark(2);
}
var time = 0;
var level = 1;
var lose = 0;
var score = 0;

function gameLoop() {
	time++;
	// console.log(lose);
	clearScreen();
	context.drawImage(bg, 0, 0, cw, ch);
	if (level == 1) {
		plankter.draw();
		shrimp2.draw2();
		plankter2.draw2();
	}
	else if (level == 2) {
		shrimp.draw();
		shrimp2.draw2();
		smallfish2.draw2();
		plankter2.draw2();
	}
	else if (level == 3) {
		smallFish.draw();
		shrimp2.draw2();
		smallfish2.draw2();
		shark2.draw2();
	}
	else {
		shark.draw();
	}
	if (lose == 1) {
		gameover();
	}
	showScore();
	showLevel();
}
function onKeyDown(e) {
	if (e.keyCode == 32) {
		level++;
		if (level > 5) {
			level = 5;
		}
	}
	if (e.keyCode == 65) {
		level--;
		if (level < 1) {
			level = 1;
		}
	}
}
function showLevel() {
	context.save();
	context.shadowBlur = 10;
	context.shadowColor = "orange";
	context.fillStyle = "yellow";
	context.strokeStyle = "black";
	context.font = "40px Verdana";
	context.textAlign = "center";

	context.fillText("Level: " + level, 100, 40);
	context.strokeText("Level: " + level, 100, 40);
	context.restore();
}
function showScore() {
	context.save();
	context.shadowBlur = 10;
	context.shadowColor = "orange";
	context.fillStyle = "yellow";
	context.strokeStyle = "black";
	context.font = "40px Verdana";
	context.textAlign = "center";

	context.fillText("Score: " + score, 100, 80);
	context.strokeText("Score: " + score, 100, 80);
	context.restore();
}
function gameover() {
	document.getElementById("gameCanvas").style.zIndex = 1;
}
function clearScreen() {
	context.clearRect(0, 0, cw, ch);
}

function hitTestPoint(x1, y1, w1, h1, x2, y2) {
	if (x2 >= x1 && x2 <= x1 + w1 && y2 >= y1 && y2 <= y1 + h1) {
		return true;
	}
	else return false;
}
function addImg(url) {
	var img = new Image();
	img.src = url;
	return img;
}