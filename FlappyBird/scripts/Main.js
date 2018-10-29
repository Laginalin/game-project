
var imgObj = {
    mountain1: "images/bg_day.png",
    mountain2: "images/bg_night.png",
    land: "images/land.png",
    bird1: ["images/bird0_0.png", "images/bird0_1.png", "images/bird0_2.png"],
    bird2: ["images/bird1_0.png", "images/bird1_1.png", "images/bird1_2.png"],
    bird3: ["images/bird2_0.png", "images/bird2_1.png", "images/bird2_2.png"],
    pipe1: ["images/pipe_down.png", "images/pipe_up.png"],
    pipe2: ["images/pipe2_down.png", "images/pipe2_up.png"],
    score: ["images/font_048.png", "images/font_049.png", "images/font_050.png", "images/font_051.png", "images/font_052.png", "images/font_053.png", "images/font_054.png", "images/font_055.png", "images/font_056.png", "images/font_057.png",],
    medal: ["images/medals_1.png", "images/medals_2.png", "images/medals_3.png", "images/medals_0.png"],
    newImg: "images/new.png"
};
loadImage(imgObj, loadGame);
var $menu = $("#menu");
var $menuPannel = $(".menu-pannel");
var birdIdx = 1, pipeIdx = 1, bgIdx = 1;

$menu.click(function() {
    //面板显示
    $menuPannel.css("display", "block");

    //定义鸟颜色选择器（轮播图）
    var $birdUp = $("#bird-arrow-up");
    var $birdDown = $("#bird-arrow-down");
    var $bird = $(".bird ul");
    var birdLength = $(".bird ul li").length;
    //鸟的Idx对应关系
    // idx === 1 或者 idx === 4时 对应图片数组为：["images/bird0_0.png", "images/bird0_1.png", "images/bird0_2.png"]
    // idx === 2 时 对应图片数组为：["images/bird1_0.png", "images/bird1_1.png", "images/bird1_2.png"]
    // idx === 0 或者 idx === 3时  对用图片数组为： ["images/bird2_0.png", "images/bird2_1.png", "images/bird2_2.png"]


    $birdDown.click(function() {
        if($bird.is(":animated")) {
            return;
        }
        birdIdx ++;
        $bird.animate({"top": 5 - 53 * birdIdx}, 500, function() {
            if(birdIdx > birdLength - 2) {
                birdIdx = 1;
                $bird.css("top", -48);
            }
        })
    })
    $birdUp.click(function() {
        if($bird.is(":animated")) {
            return;
        }
        birdIdx --;
        $bird.animate({"top": 5 - 53 * birdIdx}, 500, function() {
            if(birdIdx <= 0) {
                birdIdx = birdLength - 2;
                $bird.css("top", -154);
            }
        })
    })

    //定义背景选择器（轮播图）
    var $background = $(".background ul");
    var $bgUp = $("#bg-arrow-up");
    var $bgDown = $("#bg-arrow-down");
    var bgLength = $(".background ul li").length;

    $bgDown.click(function() {
        if($background.is(":animated")) {
            return;
        }
        bgIdx ++;
        $background.animate({"top": 15 - 48 * bgIdx}, 500, function() {
            if(bgIdx > bgLength - 2) {
                bgIdx = 1;
                $background.css("top", -33);
            }
        })
    })
    $bgUp.click(function() {
        if($background.is(":animated")) {
            return;
        }
        bgIdx --;
        $background.animate({"top": 15 - 48 * bgIdx}, 500, function() {
            if(bgIdx <= 0) {
                bgIdx = bgLength - 2;
                $background.css("top", -81);
            }
        })
    })

    //定义管子的选择器（轮播图）
    var $pipe = $(".pipe ul");
    var $pipeUp = $("#pipe-arrow-up");
    var $pipeDown = $("#pipe-arrow-down");
    var pipeLength = $(".pipe ul li").length;


    $pipeDown.click(function() {
        if($pipe.is(":animated")) {
            return;
        }
        pipeIdx ++;
        $pipe.animate({"top": 15 - 48 * pipeIdx}, 500, function() {
            if(pipeIdx > pipeLength - 2) {
                pipeIdx = 1;
                $pipe.css("top", -33);
            }
        })
    })
    $pipeUp.click(function() {
        if($pipe.is(":animated")) {
            return;
        }
        pipeIdx --;
        $pipe.animate({"top": 15 - 48 * pipeIdx}, 500, function() {
            if(pipeIdx <= 0) {
                pipeIdx = pipeLength - 2;
                $pipe.css("top", -81);
            }
        })
    })

    //点击ok时把面板去掉，并且重新载入游戏
    var $menuOk = $("#menu-ok");
    $menuOk.click(function() {
        $menuPannel.css("display", "none");
        clearInterval(timer);
        loadGame(imgObj);
    })
});

function loadImage(obj, callback) {
    var idx = 0;
    var len = 0;
    for(var i in obj) {
        if(Array.isArray(obj[i])) {
            var newImg = [];
            len += obj[i].length;
            obj[i].forEach(function(value, index) {
                var img = new Image();
                img.src = value;
                newImg[index] = img;
                obj[i] = newImg;
                img.onload = function() {
                    idx ++;
                    if(idx === len) {
                        callback(obj);
                    }
                }
            })
        } else {
            len++;
            var img = new Image();
            img.src = obj[i];
            obj[i] = img;
            img.onload = function() {
                idx++;
                if(idx === len) {
                    callback(obj);
                }
            }
        }
    }
}
var user = new User();
function loadGame(imgObj) {
    var canvas = document.getElementById("myCanvas");

    var ctx = canvas.getContext("2d");
    switch(birdIdx) {
        case 1:
        case 4:
        var bird = new Bird(imgObj.bird1, 100, 200);
        break;
        case 2:
        var bird = new Bird(imgObj.bird2, 100, 200);
        break;
        case 3:
        case 0:
        var bird = new Bird(imgObj.bird3, 100, 200);
        break;
        default:
        var bird = new Bird(imgObj.bird1, 100, 200);
    }
    switch(pipeIdx) {
        case 1:
        case 3:
        var pipe = new Pipe(imgObj.pipe1[0], imgObj.pipe1[1], 4, 360);
        break;
        case 0:
        case 2:
        var pipe = new Pipe(imgObj.pipe2[0], imgObj.pipe2[1], 4, 360);
        break;
        default:
        var pipe = new Pipe(imgObj.pipe1[0], imgObj.pipe1[1], 4, 360);
    }
    switch(bgIdx) {
        case 1:
        case 3:
        var mountain = new Background(imgObj.mountain1, 2, 0, 0);
        break;
        case 0:
        case 2:
        var mountain = new Background(imgObj.mountain2, 2, 0, 0);
        break;
        default:
        var mountain = new Background(imgObj.mountain1, 2, 0, 0);
    }
    // var bird = new Bird(imgObj.bird, 100, 200);
    // var mountain = new Background(imgObj.mountain, 2, 0, 0);
    var land = new Background(imgObj.land, 4, 0, 400);
    // var pipe = new Pipe(imgObj.pipe[0], imgObj.pipe[1], 4, 360);
    var gameOver = document.getElementById("game-over");
    var score = imgObj.score;
    var medal = imgObj.medal;
    var newImg = imgObj.newImg;
    var scoreDom = document.getElementById("game-score");
    window.g = new Game(ctx, user, bird, pipe, land, mountain, gameOver, score, scoreDom, newImg, medal);
    window.timer = setInterval(function(){
        g.clear();
        g.renderMountain();
        g.renderLand();
        }, 20)
    var start = document.getElementById("start");
    var startPanel = document.getElementById("game-start");

    start.onclick = function() {
        clearInterval(timer);
        startPanel.style.display = "none";
        g.start();
    }
    var restart = document.getElementById("restart");

    restart.onclick = function() {
        g.gameRender();
        gameOver.style.display = "none";
        g.start();
        scoreDom.style.display = "block";
    }

    var rankBtn = document.getElementById("rank");

    rankBtn.onclick = function() {
        $(".rank-pannel").css("display", "block");
        createTable($(".rank-pannel table")[0]);
    }

    var rankOk = document.getElementById("rank-ok");
    rankOk.onclick = function() {
        $(".rank-pannel").css("display", "none");
    }
}

function createTable(dom) {
    dom.innerHTML = "";
    var rank = JSON.parse(window.localStorage.getItem("rank"));
    for(var i = 0; i < 5; i ++) {
        var row = document.createElement("tr");
        dom.appendChild(row);
        for(var j = 0; j < 3; j++) {
            var grid = document.createElement("td");
            row.appendChild(grid);
            if(i === 0) {
                switch(j) {
                    case 0:
                    grid.innerHTML = "NO";
                    break;
                    case 1:
                    grid.innerHTML = "NAME";
                    break;
                    case 2:
                    grid.innerHTML = "SCORE";
                    break;
                }
            } else {
                switch(j) {
                    case 0:
                    grid.innerHTML = i;
                    break;
                    case 1:
                    grid.innerHTML = rank[i - 1] || "--";
                    break;
                    case 2:
                    grid.innerHTML = window.localStorage.getItem(rank[i - 1]) || "--";
                    break;
                }
            }
        }
    }
}
