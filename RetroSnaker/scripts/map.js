//地图构造函数

function Map() {
	this.row = null;
	this.col = null;
	this.arr = [];
}

Map.prototype = {
	constructor: Map,

	//创建一个地图
	create: function(dom) {
		for (var i = 0; i < this.row; i ++) {
			var row_dom = document.createElement("div");
			row_dom.className = "row";
			var row_arr = [];
			for(var j = 0; j < this.col; j++) {
				var col_dom = document.createElement("span");
				col_dom.className = "grid";
				row_dom.appendChild(col_dom);
				row_arr.push(col_dom);
			}
			dom.appendChild(row_dom);
			this.arr.push(row_arr);
		}
	},

	//地图清空
	clean: function() {
		for(var i = 0; i < this.arr.length; i++) {
			for(var j = 0; j < this.arr[i].length; j++) {
				this.arr[i][j].style.backgroundImage = "none";
			}
		}
	}
};