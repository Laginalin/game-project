function Game(ctx, user, bird, pipe, land, mountain, gameOver, scoreImg, scoreDom, newImg, medalImg) {
    this.ctx = ctx;
    this.user = user;
    this.bird = bird;
    this.pipeArr = [pipe];
    this.land = land;
    this.mountain = mountain;
    this.timer = null;
    this.iframe = 0;
    this.score = 0;
    this.scoreImg = scoreImg;
    this.addScore = true;
    this.gameOverPanel = gameOver;
    this.scoreDom = scoreDom;
    this.newImg = newImg;
    this.medalImg = medalImg;
    this.originData = {
        bird: {},
        pipe: {},
        mountain: {},
        land: {}
    };
    this.saveOrigin();
    this.pipeSpeed = 60;
}

Game.prototype = {

    //定义一个保存原始数据的方法
    saveOrigin: function() {
        this.originData.bird.x = this.bird.x;
        this.originData.bird.y = this.bird.y;
        this.originData.bird.state = this.bird.state;
        this.originData.bird.speed = this.bird.speed;
        this.originData.mountain.x = this.mountain.x;
        this.originData.mountain.y = this.mountain.y;
        this.originData.land.x = this.land.x;
        this.originData.land.y = this.land.y;
        this.originData.pipe.x = this.pipeArr[0].x;
        this.originData.pipe.count = this.pipeArr[0].count;
    },

    //定义一个重新加载数据的方法
    gameRender: function() {
        this.bird.x = this.originData.bird.x;
        this.bird.y = this.originData.bird.y;
        this.bird.state = this.originData.bird.state;
        this.bird.speed = this.originData.bird.speed;
        this.mountain.x = this.originData.mountain.x;
        this.mountain.y = this.originData.mountain.y;
        this.land.x = this.originData.land.x;
        this.land.y = this.originData.land.y;
        this.pipeArr[0].x = this.originData.pipe.x;
        this.pipeArr[0].count = this.originData.pipe.count;
        if(this.pipeArr.length > 1) {
            this.pipeArr.pop();
        }
        this.score = 0;
        this.iframe = 0;
        this.score = 0;
        this.addScore = true;
        this.scoreDom.innerHTML = "";
        this.pipeSpeed = 60;
    },

    //渲染背景山
    renderMountain: function() {
        var img = this.mountain.img;
        this.mountain.x -= this.mountain.step;

        if(this.mountain.x < -img.width) {
            this.mountain.x = 0;
        }

        this.ctx.drawImage(img, this.mountain.x, this.mountain.y);
        this.ctx.drawImage(img, this.mountain.x + img.width, this.mountain.y);
        this.ctx.drawImage(img, this.mountain.x + img.width * 2, this.mountain.y)
    },

    //渲染地面
    renderLand: function() {
        var img = this.land.img;
        this.land.x -= this.land.step;

        if(this.land.x < -img.width) {
            this.land.x = 0;
        }

        this.ctx.drawImage(img, this.land.x, this.land.y);
        this.ctx.drawImage(img, this.land.x + img.width, this.land.y);
        this.ctx.drawImage(img, this.land.x + img.width * 2, this.land.y);
    },

    //渲染鸟
    renderBird: function() {
        var img = this.bird.img;
        this.ctx.save();
        this.ctx.translate(this.bird.x, this.bird.y);

        var deg = this.bird.state === "Down" ? Math.PI / 180 * this.bird.speed: -Math.PI / 180 * this.bird.speed;
        this.ctx.rotate(deg);
        this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
        this.ctx.restore();
    },

    //渲染管子
    renderPipe: function() {
        var me = this;
        this.pipeArr.forEach(function(value, index) {
            var img_up = value.pipe_up;
            var up_img_x = 0;
            var up_img_y = img_up.height - value.pipe_up_height;
            var up_img_w = img_up.width;
            var up_img_h = value.pipe_up_height;
            var up_canvas_x = me.ctx.canvas.width - value.step * value.count;
            var up_canvas_y = 0;
            var up_canvas_w = img_up.width;
            var up_canvas_h = value.pipe_up_height;

            me.ctx.drawImage(img_up, up_img_x, up_img_y, up_img_w, up_img_h, up_canvas_x, up_canvas_y, up_canvas_w, up_canvas_h);

            var img_down = value.pipe_down;
            var down_img_x = 0;
            var down_img_y = 0;
            var down_img_w = img_down.width;
            var down_img_h = 250 - value.pipe_up_height
            var down_canvas_x = me.ctx.canvas.width - value.step * value.count;
            var down_canvas_y = value.pipe_up_height + 150;
            var down_canvas_w = down_img_w;
            var down_canvas_h = down_img_h;

            me.ctx.drawImage(img_down, down_img_x, down_img_y, down_img_w, down_img_h, down_canvas_x, down_canvas_y, down_canvas_w, down_canvas_h);
        })
    },

    //渲染分数
    renderScore: function() {
        this.scoreDom.innerHTML = "";
        var score_arr = this.score.toString().split("");
        for(var i = 0; i < score_arr.length; i ++) {
            var idx = score_arr[i];
            var imgDom = new Image();
            imgDom.src = this.scoreImg[idx].src;
            this.scoreDom.appendChild(imgDom);
        }
    },

    //渲染奖牌
    renderMedal: function() {
        var idx = this.user.rank.indexOf(this.user.name);
        var medalDom = this.gameOverPanel.getElementsByClassName("medal")[0];
        switch(idx) {
            case 0:
            medalDom.style.background = "url(" + this.medalImg[0].src + ")";
            break;
            case 1:
            medalDom.style.background = "url(" + this.medalImg[1].src +")";
            break;
            case 2:
            medalDom.style.background = "url(" + this.medalImg[2].src + ")";
            break;
            default:
            medalDom.style.background = "url(" + this.medalImg[3].src + ")";
        }
    },

    //管子移动
    movePipe: function() {
        this.pipeArr.forEach(function(value) {
		value.count++;
	   })
    },

    //生成管子
    createPipe: function() {
        var pipe = this.pipeArr[0].createPipe();
        this.pipeArr.push(pipe);
    },

    //删除屏幕之外的管子
    clearPipe: function() {
        for(var i = 0; i < this.pipeArr.length; i ++) {
            var pipe = this.pipeArr[i];
            if(pipe.x - pipe.step * pipe.count < - pipe.pipe_up.width) {
                this.pipeArr.splice(i, 1);
                return;
            }
        }
    },

    //定义一个清屏的方法
    clear: function() {
        this.ctx.clearRect(0, 0, 360, 512);
    },

    //定义一个游戏开始的方法
    start: function() {
        var me = this;
        this.timer = setInterval(function(){
            me.iframe++;
            me.clear();
            me.bindEvent();
            me.renderMountain();
            me.renderPipe();
            me.renderLand();
            if(!(me.iframe % 10)) {
                me.bird.fly();
            }
            me.bird.fallDown();
            me.movePipe();
            me.renderBird();
            if(!(me.iframe % me.pipeSpeed)) {
                me.createPipe();
            };
            me.clearPipe();
            me.checkBoom();
        }, 20)
    },

    //绑定事件
    bindEvent: function() {
        var me = this;
        this.ctx.canvas.onclick = function() {
            me.bird.goUp();
        }
        $(this.ctx.canvas).on("tap",function(event) {
            me.bird.goUp();
            event.preventDefault;
        })
    },

    //检测碰撞
    checkBoom: function() {
        for(var i = 0; i < this.pipeArr.length; i++) {
            var pipe = this.pipeArr[i];

            var pipe_up = {
                A: {
                    x: pipe.x - pipe.step * pipe.count,
                    y: 0
                },
                B: {
                    x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
                    y: 0
                },
                C: {
                    x:pipe.x - pipe.step * pipe.count,
                    y: pipe.pipe_up_height
                },
                D: {
                    x: pipe.x - pipe.step * pipe.count + pipe.pipe_up.width,
                    y: pipe.pipe_up_height
                }
            };
            var pipe_down = {
                A: {
                    x: pipe_up.A.x,
                    y: pipe_up.C.y + 150
                },
                B: {
                    x: pipe_up.B.x,
                    y: pipe_up.C.y + 150
                },
                C: {
                    x: pipe_up.A.x,
                    y: 400
                },
                D: {
                    x: pipe_up.B.x,
                    y: 400
                }
            };
            var birdPoint = {
                A: {
                    x: -this.bird.img.width / 2 + this.bird.x + 5,
                    y: -this.bird.img.height / 2 + this.bird.y + 12
                },
                B: {
                    x: -this.bird.img.width / 2 + this.bird.img.width + 5 + this.bird.x - 13,
                    y: -this.bird.img.height / 2 + this.bird.y + 12
                },
                C: {
                    x: -this.bird.img.width / 2 + this.bird.x + 5,
                    y: -this.bird.img.height / 2 + this.bird.img.height + this.bird.y + 12 - 22,
                },
                D: {
                    x: -this.bird.img.width / 2 +  this.bird.img.width + 5 + this.bird.x - 13,
                    y: -this.bird.img.height / 2 + this.bird.img.height + this.bird.y + 12 - 22
                }
            };
            //检测是否碰到上管子
            if (birdPoint.B.x >= pipe_up.C.x && birdPoint.B.y <= pipe_up.C.y && birdPoint.A.x <= pipe_up.D.x) {
                this.gameOver();
            }
            //检测是否碰到下管子
            if (birdPoint.D.x >= pipe_down.A.x && birdPoint.D.y >= pipe_down.A.y && birdPoint.A.x <= pipe_down.B.x) {
                this.gameOver();
            }
            //检测是否撞到地面或者天空
            if (birdPoint.D.y >= 400 || birdPoint.B.y <= 0) {
                this.gameOver();
            }
            //检测是否经过管子，完全通过管子才可开锁
            if (birdPoint.A.x >= pipe_up.C.x && birdPoint.B.x <= pipe_up.D.x && birdPoint.C.y <= pipe_down.C.y && birdPoint.B.y >= pipe_up.D.y && this.addScore) {
                this.score ++;
                this.addScore = false;
                //渲染分数
                this.renderScore();
                //改难度
                switch(this.score) {
                    case 10:
                    this.pipeSpeed = 55;
                    break;
                    case 30:
                    this.pipeSpeed = 50;
                    break;
                    case 60:
                    this.pipeSpeed = 45;
                }
            }
            if (birdPoint.B.x >= pipe_up.D.x) {
                this.addScore = true;
            }
        }
    },

    //游戏结束的方法
    gameOver: function() {
        this.saveData();
        this.rankList();
        var best = this.user.storage.getItem(this.user.name);
        this.scoreDom.style.display = "none";
        this.gameOverPanel.style.display = "block";
        this.renderMedal();
        clearInterval(this.timer);
        var scoreDom = this.gameOverPanel.getElementsByClassName("score")[0];
        var bestDom = this.gameOverPanel.getElementsByClassName("best")[0];
        scoreDom.innerHTML = this.score;
        bestDom.innerHTML = best;
    },

    //定义一个加载用户数据的方法
    saveData: function() {
        var history = this.user.score;
        var newDom = this.gameOverPanel.getElementsByClassName("new")[0];
        if (this.score > history) {
            this.user.score = this.score;
            this.user.setUser(this.user.name, this.score);
            newDom.style.backgroundImage = "url(" + this.newImg.src + ")";
        } else {
            newDom.style.backgroundImage = "";
        }
	},

    //定义一个生成排行的方法
    rankList: function() {
        var me = this;
        var rank_arr = this.user.rank;
        var rankIdx = rank_arr.indexOf(this.user.name);
        function getScore(name) {
            return parseInt(window.localStorage.getItem(name));
        }
        function compareScore(n) {
            for(var i = 0 ; i < n; i++) {
                var score = getScore(rank_arr[i]);
                if(me.score > score) {
                    rank_arr.splice(n, 1);
                    rank_arr.splice(i, 0, me.user.name);
                    window.localStorage.setItem("rank", JSON.stringify(rank_arr));
                    break;
                }
            }
        }
        switch(rankIdx) {
            case 0:
            break;
            case 1:
            compareScore(1);
            break;
            case 2:
            compareScore(2);
            break;
            case 3:
            compareScore(3);
            break;
            default:
            (function() {
                for(var i = 0; i < rank_arr.length; i++) {
                    if(rank_arr[i] == undefined) {
                        rank_arr.splice(i, 0, me.user.name);
                        rank_arr.pop();
                        return window.localStorage.setItem("rank", JSON.stringify(rank_arr));
                    } else {
                        var score = getScore(rank_arr[i]);
                        if(me.score > score) {
                            rank_arr.splice(i, 0, me.user.name);
                            rank_arr.pop();
                            return window.localStorage.setItem("rank", JSON.stringify(rank_arr));
                        }
                    }
                }
            })();
        }
    }
}
