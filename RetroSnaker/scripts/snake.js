//蛇的构造函数

function Snake(picObj) {
	this.arr = [];
	this.direction = null;
	this.lock = true;
	this.headPic = picObj.Head;
	this.bodyPic = picObj.Body;
	this.tailPic = picObj.Tail;
	this.headIdx = null;
	this.tailIdx = null;
}

Snake.prototype = {
	constructor: Snake,

	//定义蛇的移动方法
	move: function() {
		var newHead = {
			row: this.arr[this.arr.length - 1].row,
			col: this.arr[this.arr.length - 1].col
		};

		switch(this.direction) {
			case 37: 
			newHead.col--;
			break;
			case 38:
			newHead.row--;
			break;
			case 39:
			newHead.col++;
			break;
			case 40:
			newHead.row++;
			break;
		}

		this.arr.push(newHead);
		this.arr.shift();

		var tail = this.arr[0];
		var preTail = this.arr[1];
		if(tail.row === preTail.row) {
			this.tailIdx = tail.col > preTail.col ? 2 : 0 ;
		} else {
			this.tailIdx = tail.row > preTail.row ? 3 : 1 ;
		}
		this.lock = true;
	},

	//定义蛇的转向方法
	change: function(direction) {
		if(!this.lock) {
			return;
		}
		lock = false;

		var compare = Math.abs(direction - this.direction);

		if(compare === 0 || compare === 2) {
			return;
		} else {
			this.direction = direction;
		}

		switch(this.direction) {
			case 37:
			this.headIdx = 0;
			break;
			case 38:
			this.headIdx = 1;
			break;
			case 39:
			this.headIdx = 2;
			break;
			case 40:
			this.headIdx = 3;
			break;
		}
	},

	//定义蛇的增长方法
	grow: function() {
		var tail = this.arr[0];
		this.arr.unshift(tail);
	}
}