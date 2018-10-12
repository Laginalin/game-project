//食物的构造函数

function Food(picObj) {
	this.row = null;
	this.col = null;
	this.pic = picObj.Food;
}

Food.prototype.reset = function(x, y) {
	this.row = x;
	this.col = y;
}