/**
 * 定义一个背景类，用于生成山以及地面
 * @param       {[type]} img  背景图（山/地面）
 * @param       {[type]} step 背景移动的速度
 * @param       {[type]} x    背景图定位
 * @param       {[type]} y    背景图定位
 * @constructor
 */

function Background(img, step, x, y) {
    this.img = img;
    this.step = step;
    this.x = x;
    this.y = y;
}
