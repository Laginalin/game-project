/**
 * 创建一个鸟的类
 * @param       {[type]} imgArr 传入鸟的图片
 * @param       {[type]} x      定义坐标轴x方向上的平移
 * @param       {[type]} y      定义坐标轴y方向上的平移
 * @constructor
 */
function Bird(imgArr, x, y) {
    this.imgArr = imgArr;
    this.idx = parseInt(Math.random() * this.imgArr.length);
    this.img = this.imgArr[this.idx];
    this.x = x;
    this.y = y;
    this.state = "Down";
    this.speed = 0;
}

Bird.prototype = {
    //鸟的飞行动画，翅膀变化
    fly: function() {
        this.idx++;
        if(this.idx >= this.imgArr.length) {
            this.idx = 0;
        }
        this.img = this.imgArr[this.idx];
    },
    //鸟的下降
    fallDown: function() {
        if(this.state === "Down") {
            this.speed ++;
            this.y += Math.sqrt(this.speed);
        } else {
            this.speed--;
            if(this.speed === 0) {
                this.state = "Down";
                return;
            }
            this.y -= Math.sqrt(this.speed);
        }
    },
    //鸟的上升
    goUp: function() {
        this.state = "Up";
        this.speed = 20;
    },
    constructor: Bird
}
