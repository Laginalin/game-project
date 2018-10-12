function Game(user, map, food, snake, domObj) {
	this.user = user;
	this.map = map;
	this.food = food;
	this.snake = snake;
	this.mapDom = domObj.map;
	this.scoreDom = domObj.score;
	this.beginDom = domObj.begin;
	this.stopDom = domObj.stop;
	this.userDom = domObj.user;
	this.historyDom = domObj.history;
	this.timer = null;
	this.flag = null;
	this.score = 0;
	this.appear = false;
	this.mask = document.createElement("div");
	this.mask.className = "mask";
	this.over = "GAME OVER! <br /> Please click start button to restart the game!";
	this.pause = "GAME PAUSE! <br /> Please click start button to continue the game!";
	this.init();
}

Game.prototype = {
	constructor: Game,

	//定义游戏初始化的方法
	init: function() {
		//先还原所有条件
		this.clearAll();
		//加载原始参数传递内容
		this.loadOrigin();
		//加载数据
		this.renderData();
		//地图渲染
		this.renderMap();
		//渲染食物
		this.renderFood();
		//渲染蛇
		this.renderSnake();
		//绑定事件
		this.bindEvent();
	},

	//定义一个重载原始参数的方法
	loadOrigin: function() {
		this.map.row = 30;
		this.map.col = 30;
		this.map.arr = new Array();
		this.food.row = 13;
		this.food.col = 6;
		this.snake.arr = new Array({row: 4, col: 7}, {row: 4, col: 8}, {row: 4, col: 9});
		this.snake.direction = 39;
		this.snake.headIdx = 2;
		this.snake.tailIdx = 0;
	},

	//定义一个清空map容器存放的方法
	clearAll: function() {
		this.mapDom.innerHTML = "";
		this.scoreDom.innerHTML = "0";
		this.score = 0;
		this.userDom.innerHTML = "";
		this.userDom.value = null;
		this.historyDom.innerHTML = "";
		this.historyDom.value = null;
	},

	//定义一个加载用户数据的方法
	renderData: function() {
		this.user.getUser();
		this.userDom.innerHTML = this.user.name;
		this.userDom.value = this.user.name;
		this.historyDom.innerHTML = this.user.score;
		this.historyDom.value = this.user.score;
	},

	//定义一个渲染地图的方法
	renderMap: function() {
		this.map.create(this.mapDom);
	},

	//定义一个渲染食物的方法
	renderFood: function() {
		var row = this.food.row;
		var col = this.food.col;
		this.map.arr[row][col].style.backgroundImage = "url(" + this.food.pic[0] + ")";
	},

	//定义一个渲染蛇的方法
	renderSnake: function() {
		var head = this.snake.arr[this.snake.arr.length - 1];
		var tail = this.snake.arr[0];
		this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.headPic[this.snake.headIdx] + ")";
		this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tailPic[this.snake.tailIdx] + ")";
		for(var i = 1 ; i < this.snake.arr.length - 1; i++) {
			var one = this.snake.arr[i];
			this.map.arr[one.row][one.col].style.backgroundImage ="url(" + this.snake.bodyPic[0] + ")";
		}
	},

	//定义一个游戏开始的方法
	gameStart: function() {
		var me = this;
		this.flag = true;
		this.bindEvent();		
		if(me.appear) {
			var mask = this.removeMask();
			var para = mask.children[0].innerHTML;
			if(para.indexOf("OVER") != -1) {
				me.init();
			}
			me.mask.innerHTML = ""; 
		}
		me.timer = setInterval(function(){
			//蛇移动
			me.snake.move();
			//判断蛇的移动碰到的东西
			me.checkSnake();			
			if(me.flag) {
				me.map.clean();
				me.renderFood();
				me.renderSnake();
			}
		}, 200);
	},

	//定义一个游戏结束的方法
	gameOver: function() {
		this.createMask(this.over);
		this.saveData();
		this.flag = false;
		clearInterval(this.timer);
	},

	//定义一个游戏暂停的方法
	gamePause: function() {
		this.createMask(this.pause);
		document.onkeydown = null;
		this.stopDom.onclick = null;
		clearInterval(this.timer);
	},

	//定义一个方法，检测当蛇的头部碰到map,food,以及snake本身时执行不同方法
	checkSnake: function() {
		var head = this.snake.arr[this.snake.arr.length - 1];
		var food = this.food;
		//撞墙检测,游戏结束
		if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
			document.onkeydown = null;
			this.stopDom.onclick = null;
			this.gameOver();
			return;
		}
		//自杀检测，游戏结束
		for(var i = 0; i < this.snake.arr.length - 1; i++) {
			var one = this.snake.arr[i];
			if(head.row === one.row && head.col === one.col) {
				document.onkeydown = null;
				this.stopDom.onclick = null;
				this.gameOver();
				return;
			}
		}
		//食物检测，吃到食物，分数增加1分并且渲染到分数的容器中，重载食物
		if(head.row === food.row && head.col === food.col) {
			this.score++;
			this.scoreDom.innerHTML = this.score;
			this.snake.grow();
			this.resetFood();
		}
	},

	//定义一个重载食物的方法
	resetFood: function() {
		var row = parseInt(Math.random() * this.map.row);
		var col = parseInt(Math.random() * this.map.col);
		//检测食物是否随机到了蛇的身体上
		for(var i = 0; i < this.snake.arr.length; i++) {
			var one = this.snake.arr[i];
			if(row === one.row && col === one.col) {
				this.resetFood();
				return;
			}
		}

		this.food.reset(row, col);
	},

	//定义一个产生提示用户结果蒙版的方法
	createMask: function(str) {
		this.appear = true;
		var para = document.createElement("p");
		para.className = "para";
		para.innerHTML = str;
		this.mask.appendChild(para);		
		this.mapDom.appendChild(this.mask);
	},

	//定义一个移除mask并且返回mask内的文本内容
	removeMask: function() {
		this.appear = false;
		return this.mapDom.removeChild(this.mask);
	},

	//定义一个保存用户数据的方法
	saveData: function() {
		var nowScore = this.score;
		var name = this.userDom.innerHTML;
		var history = this.historyDom.innerHTML;
		if(nowScore <= history) {
			return;
		} 
		this.user.setUser(name, nowScore);
	},

	//添加事件绑定
	bindEvent: function() {
		var me = this;

		document.onkeydown = function(e) {
			var e = e || window.event;
			var code = e.keyCode;
			if(code === 37 || code === 38 || code === 39 || code === 40) {
				me.snake.change(code);
			}
		} 

		this.beginDom.onclick = function() {
			me.gameStart();
		}

		this.stopDom.onclick = function() {
			me.gamePause();
		}
	}	
}