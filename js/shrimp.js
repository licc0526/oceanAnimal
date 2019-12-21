window.onmousemove = mouseMoveHandler;

var shrimpWidth = 100;
var shrimpHeight = 100;

var shrimpObj = function () {
	this.x;
	this.y;
	this.angle;
	this.number;
	this.keyframe;
	this.num;

	this.testShrimpAndPlayer = function () {

		for (var i = 1; i > 0; i--)//判断玩家序列帧个数
		{
			for (var j = this.keyframe.length - 1; j >= 0; j--)//判断漂浮物关键帧序列帧总个数
			{
				var hit = hitTestPoint(this.keyframe[j].x, this.keyframe[j].y, shrimpWidth, shrimpHeight, playerX, playerY);
				if (hit) {
					if (level < 2) {
						lose = 1;
					}
					else if (level > 2) {
						this.keyframe.splice(j, 1);
						score += 1;
					}
					if (score == 10) {
						level++;
						score = 0;
					}
					break;
				}
			}
		}
	}
}
shrimpObj.prototype.init = function () {
	this.x = cw;
	this.y = ch;
	this.angle = 0;
	this.number = 1;
	this.keyframe = [];
	this.num = 0;
}
shrimpObj.prototype.draw = function () {

	this.image = addImg("../img/huaji3.png");

	this.x = lerpDistance(mx, this.x, 0.995);
	this.y = lerpDistance(my, this.y, 0.995);

	var deltaY = my - this.y;
	var deltaX = mx - this.x;

	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	this.angle = lerpAngle(beta, this.angle, 0.6);

	context.save();

	context.translate(this.x, this.y);
	context.rotate(this.angle);

	context.drawImage(this.image, this.image.width / 2, this.image.height / 2, -this.image.width, -this.image.height);

	context.restore();

	////////////////////////////碰撞检测//////////////////////////////////////////
	playerX = this.x;
	playerY = this.y;
}

////////////////////////////////////////海洋生物自由角色创建///////////////////////////////////////////////////

shrimpObj.prototype.createShrimp = function (number)		//海藻数量
{
	this.num = number;
	for (var i = 0; i < this.num; i++) {
		for (var pn = 1; pn <= 1; pn++) {
			// var item = addImg("plankter/plankter (" + pn + ").png");
			var item = addImg("../img/huaji3.png");

			var px = cw * Math.random();//不同的初始位置
			var py = ch * Math.random();

			var sx = 2 * (Math.random() - 0.5);//不同的初始速度
			var sy = 2 * (Math.random() - 0.5);

			this.keyframe.push({ item: item, x: px, y: py, speedX: sx, speedY: sy });

		}

	}
}

shrimpObj.prototype.draw2 = function () {

	var item = new Image();

	for (var i = 0; i < this.keyframe.length; i++) {
		item = this.keyframe[i];
		item.x -= item.speedX;
		item.y -= item.speedY;
		context.drawImage(item.item, item.x, item.y);

		//////////////////////碰撞检测////////////////////////
		this.testShrimpAndPlayer();

		//////////////////////边界判断////////////////////////
		if (item.x < 0) {
			item.speedX = -item.speedX;
			item.x = 0;
		}
		if (item.x > cw - shrimpWidth) {
			item.speedX = -item.speedX;
			item.x = cw - shrimpWidth;
		}
		if (item.y < 0) {
			item.speedY = -item.speedY;
			item.y = 0;
		}

		if (item.y > ch - shrimpWidth) {
			item.speedY = -item.speedY;
			item.y = ch - shrimpWidth;
		}
	}

	if (time % 120 == 0) {
		item.speedX = 2 * (Math.random() - 0.5);
		item.speedY = 2 * (Math.random() - 0.5);
	}


}


function mouseMoveHandler(e) {
	mx = e.x * cw / (document.body.clientWidth);
	my = e.y * ch / (document.body.clientHeight);
}