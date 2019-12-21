window.onmousemove = mouseMoveHandler;

var smallfishWidth = 130;
var smallfishHeight = 130;

var smallfishObj = function () {
	this.x;
	this.y;
	this.angle;
	this.number;
	this.keyframe;
	this.num;

	this.testSmallfishAndPlayer = function () {

		for (var i = 1; i > 0; i--)//判断玩家序列帧个数
		{
			for (var j = this.keyframe.length - 1; j >= 0; j--)//判断漂浮物关键帧序列帧总个数
			{
				var hit = hitTestPoint(this.keyframe[j].x, this.keyframe[j].y, smallfishWidth, smallfishHeight, playerX, playerY);
				if (hit) {
					if (level < 3) {
						lose = 1;
					}
					else if (level > 3) {
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
smallfishObj.prototype.init = function () {
	this.x = cw;
	this.y = ch;
	this.angle = 0;
	this.number = 1;
	this.keyframe = [];
	this.num = 0;
}
smallfishObj.prototype.draw = function () {

	this.image = addImg("../img/huaji2.png");

	this.x = lerpDistance(mx, this.x, 0.985);
	this.y = lerpDistance(my, this.y, 0.985);

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
	playerX = this.x;//这里借助临时变量保存坐标值
	playerY = this.y;
}

////////////////////////////////////////海洋生物自由角色创建///////////////////////////////////////////////////

smallfishObj.prototype.createSmallfish = function (number)		//海藻数量
{
	this.num = number;
	for (var i = 0; i < this.num; i++) {
		for (var pn = 1; pn <= 1; pn++) {
			// var item = addImg("plankter/plankter (" + pn + ").png");
			var item = addImg("../img/huaji2.png");

			var px = cw * Math.random();//不同的初始位置
			var py = ch * Math.random();

			var sx = 2 * (Math.random() - 0.5);//不同的初始速度
			var sy = 2 * (Math.random() - 0.5);

			this.keyframe.push({ item: item, x: px, y: py, speedX: sx, speedY: sy });

		}

	}
}

smallfishObj.prototype.draw2 = function () {

	var item = new Image();

	for (var i = 0; i < this.keyframe.length; i++) {
		item = this.keyframe[i];
		item.x -= item.speedX;
		item.y -= item.speedY;
		context.drawImage(item.item, item.x, item.y);

		//////////////////////碰撞检测////////////////////////
		this.testSmallfishAndPlayer();

		//////////////////////边界判断////////////////////////
		if (item.x < 0) {
			item.speedX = -item.speedX;
			item.x = 0;
		}
		if (item.x > cw - smallfishWidth) {
			item.speedX = -item.speedX;
			item.x = cw - smallfishWidth;
		}
		if (item.y < 0) {
			item.speedY = -item.speedY;
			item.y = 0;
		}

		if (item.y > ch - smallfishWidth) {
			item.speedY = -item.speedY;
			item.y = ch - smallfishWidth;
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