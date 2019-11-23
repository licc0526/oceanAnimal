window.onload = init;
window.onmousemove = mouseMoveHandler;
var cw = 1024, ch = 768;
var bg;
var context;
var animal;

function init() {
	var canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");
	bg = addImg("./g9.jpg");
	setInterval(gameloop, 1000 / 60);
}
function gameloop() {
	clearScreen();
	context.drawImage(bg, 0, 0, cw, ch);
	drawAnimal();
}
var fpn = 1;
var animalX = 0.5 * cw;
var animalY = ch - 200;
var anmalWidth = new Array(50, 50, 50, 50, 50);//62, 54, 52, 45, 40
var animalHeight = 54;
drawAnimal(){
	animal = addImg("../huaji2 .png");
	context.drawImage(animal, animalX - 45, animalY - 5, 130, 55);
}
function clearScreen() {
	context.clearRect(0, 0, cw, ch);
}
function mouseMoveHandler(e) {
	animalX = e.x - animalWidth[fpn - 1] / 2 - 500;
	animmalY = e.y - animalHeight / 2 - 20;
}
function addImg(url) {
	var img = new Image();
	img.src = url;
	return img;
}