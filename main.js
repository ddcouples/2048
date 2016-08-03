var bord = [];
var hasConflicted = [];//检测是否碰撞
var isGameoverFlag = false;
var canScroll = false;//能够滚屏;
var currentPosition = 0;
var score = 0, curScore = 0;
var $gridcontainer = null, $gridcell = null;
var isFullScreen = false;
var isGaming = false;
var sniperState = false;//狙击状态不可用
var times = 3;//使用次数
var lastBord=[],lastScore=0,lastPosition=0;
//加载音乐http://localhost:56876/sound/eat.mp3
var eat = new Audio("00.mp3"), end = new Audio("end.wav"), fls = new Audio("fenlies.MP3"),
    position = new Audio("powerPosition.mp3"), junGe = new Audio("yjj.mp3"), huanhu = new Audio("huanhu.mp3");
fls.loop = "true", junGe.loop = "true", fls.volume = 0.1, junGe.volume = 0.1,huanhu.preload="auto";
var $addArmy = $('<div style="position:absolute;margin-top:-147px;margin-left:-175px;display:none;z-index:9900;"><img src="yanhua.jpg" alt="祝福动图 (8)" data-tag="bdshare"></div>');
var $tui = $('<div style="width: 240px; border-radius: 50px; background-color: #0094ff;font-size:10px;line-height:24px;text-align:center;color:#ff0;text-shadow:none;position:absolute;margin-top:-30px;margin-left:-120px;display:none;z-index:9999;">加油！<br/>转业退休就在眼前^^</div>');
var $addArmyJun = $('<div style="position:absolute;margin-top:-89px;margin-left:-158px;display:none;z-index:9900;"><img src="yuebing.gif" alt="祝福动图 (8)" data-tag="bdshare"></div>');//扩军
var $addArmyJunfont = $('<div style="width: 100px; height: 80px; border-radius: 20px; background-color: #0094ff;font-size:15px;line-height:80px;text-align:center;color:#f00;text-shadow:none;position:absolute;margin-top:-40px;margin-left:-50px;display:none;z-index:9999;">将军,增编咯！</div>');


//加载
$(function () {
    $gridcontainer = $("#grid-container");
    newgame();
})

//初始化
function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        gridContainerBorder = 5;
        cellSpace = 20;
        cellSideLength = 100;
    }
    backStep();
    $gridcontainer.css("width", gridContainerWidth).css("height", gridContainerWidth).css("border", gridContainerBorder + "px solid #E0D2D2").css("border-radius", 0.03 * gridContainerWidth + "px").css("background-color", "#b57575");
    $(".grid-cell").remove();
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            $gridcontainer.append(" <div class='grid-cell' id='grid-cell-" + i + "-" + j + "'></div>");
            $("#grid-cell-" + i + "-" + j).css("top", getPos(j)).css("left", getPos(i)).css("position", "absolute").css("background-color", "#88a056");
        }
    }
    $gridcell = $(".grid-cell");
    $gridcell.css("width", cellSideLength).css("height", cellSideLength).css("border-radius", 0.1 * cellSideLength + "px");
}
function newgame() {
    isGameoverFlag = false;
    currentPosition = 0;
    curScore = 0;
    score = 0;
    times = 3;
    n = 4;
    preperCon();
    prepareForMobile();
    getBackSound();
    sniperTextAnimation();
    init();
    $gridcontainer.append($tui);
    $gridcontainer.append($addArmy);
    generateOneNumber();
    generateOneNumber();
    //tuixiu();

    sniperWork();
}
//初始化界面
function init() {
    for (var i = 0; i < n; i++) {
        bord[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < n; j++) {
            bord[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    $("#score").text(curScore).animate({ "font-size": "40px", "opacity": "0.2" }, 100).animate({ "font-size": "15px", opacity: 1 }, 100);
    $("#position").text(getTextValue(currentPosition)).animate({ "font-size": "40px", "opacity": "0.2" }, 100).animate({ "font-size": "15px", opacity: 1 }, 100);
    updateBoardView(bord);
}

//随机生成一个数字即角色
function generateOneNumber() {
    if (nospace(bord)) {
        return false;
    }
    //随机一个位置
    var isSpace = [];
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (bord[i][j] == 0) {
                var space = [];
                space.push(i);
                space.push(j);
                isSpace.push(space);
            }
        }
    }

    var index = parseInt(Math.floor(Math.random() * isSpace.length));
    var number = Math.random() < 0.5 ? 2 : 4;
    var x = isSpace[index][0], y = isSpace[index][1];
    bord[x][y] = number;
    showNumberWithAnimation(x, y, number);
}

//升值退休


function tuixiu() {
    $tui.css("top", gridContainerWidth / 2).css("left", gridContainerWidth / 2).css("display", "").text(getCharValue(currentPosition));
    setTimeout(" removeTui()", 1510);
}
function removeTui() {
   
    $tui.slideUp(600);
}

//根据数组更新页面
function updateBoardView(bordes) {
    $(".number-cell").remove();
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            $gridcontainer.append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numbercell = $("#number-cell-" + i + "-" + j);
            if (bordes[i][j] == 0) {
                numbercell.css("width", 0).css("height", 0).css("top", getPos(i) + cellSideLength / 2).css("left", getPos(j) + cellSideLength / 2);
            } else {
                numbercell.css('width', (cellSideLength - 2)).css('height', cellSideLength - 2).css('top', getPos(i) + 1).css('left', getPos(j) + 1).css('background-color', getNumberBackgroundColor(bord[i][j])).css('color', getNumberColor(bord[i][j])).css("border-radius", 0.01 * cellSideLength + "px").text(getTextValue(bord[i][j]));
            }
            hasConflicted[i][j] = false;
        }
    }
    $('.number-cell').css('line-height',cellSideLength + 'px');
    $('.number-cell').css('font-size', 0.2 * cellSideLength + 'px');
}
document.addEventListener("dblclick", function () {
    if (!isFullScreen) {
        requestFullScreen(document.documentElement);
        isFullScreen = true;
    } else {
        exitFull();
        isFullScreen = false;
    }
}, false)
//操作
document.addEventListener("touchstart", function (e) {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
}, false);

document.addEventListener("touchmove", function (e) {
    if (canScroll) {
        event.preventDefault()
    }
}, false)

document.addEventListener("touchend", function (e) {
    if (!isGaming) return false;
    if (sniperState) return false;
    endx = e.changedTouches[0].pageX;
    endY = e.changedTouches[0].pageY;
    var deltaX = endx - startX, deltaY = endY - startY, maxLength = 0.05 * documentWidth;
    if (maxLength > 40) maxLength = 40;
    if (Math.abs(deltaX) < maxLength && Math.abs(deltaY) < maxLength)
        return;
    clone(lastBord, bord);
    lastScore = curScore;
    lastPosition = currentPosition;
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {
            //向右移动  moveRight();
            if (moveRight(bord)) {
                setTimeout("generateOneNumber()", 220);
                setTimeout("isGameover()", 800);
                console.log("rig");
            }

        } else {
            // moveLeft();
            if (moveLeft(bord)) {
                setTimeout("generateOneNumber()", 220);
                setTimeout("isGameover()", 800);
                console.log("left")
            }
        }
    } else {
        if (deltaY > 0) {
            //moveDown()
            if (moveDown(bord)) {
                setTimeout("generateOneNumber()", 220);
                setTimeout("isGameover()", 800);
                console.log("down")
            }
        } else {
            //moveUP(); 
            if (moveUp(bord)) {
                setTimeout("generateOneNumber()", 220);
                setTimeout("isGameover()", 800);
                console.log("down")
            }
        }
    }

}, false)

function moveRight(bord) {
    if (!canMoveRight(bord)) {
        return false;
    }
    for (var i = 0; i < n; i++) {
        for (var j = n-2; j >= 0; j--) {
            if (bord[i][j] != 0) {
                for (var k = n-1; k > j; k--) {
                    if ((bord[i][j] == bord[i][k] && noBlockHorizontal(i, j, k, bord) && !hasConflicted[i][k])) {
                        showMoveAnimate(i, j, i, k);
                        bord[i][k] += bord[i][j];
                        score += bord[i][k];
                        positionAnimate(score, bord[i][k]);
                        bord[i][j] = 0;
                        hasConflicted[i][k] = true;
                        continue;
                    } else if (bord[i][k] == 0 && noBlockHorizontal(i, j, k, bord)) {
                        showMoveAnimate(i, j, i, k);
                        bord[i][k] = bord[i][j];
                        bord[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView(bord);
    }, 210);
    return true;
}
function moveLeft(bord) {
    if (!canMoveLeft(bord)) {
        return false;
    }
    for (var i = 0; i < n; i++) {
        for (var j = 1; j < n; j++) {
            if (bord[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if ((bord[i][j] == bord[i][k] && noBlockHorizontal(i, k, j, bord) && !hasConflicted[i][k])) {
                        showMoveAnimate(i, j, i, k);
                        bord[i][k] += bord[i][j];
                        //设置position
                        score += bord[i][k];
                        positionAnimate(score, bord[i][k]);
                        bord[i][j] = 0;
                        hasConflicted[i][k] = true;
                        continue;
                    } else if (bord[i][k] == 0 && noBlockHorizontal(i, k, j, bord)) {
                        showMoveAnimate(i, j, i, k);
                        bord[i][k] = bord[i][j];
                        bord[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView(bord);
    }, 210);
    return true;
}
function moveDown(bord) {
    if (!canMoveDown(bord)) {
        return false;
    }
    for (var i = n-1; i >= 0; i--) {
        for (var j = 0; j < n; j++) {
            if (bord[i][j] != 0) {
                for (var k = n-1; k > i; k--) {
                    if ((bord[i][j] == bord[k][j] && noBlockVertial(i, k, j, bord) && !hasConflicted[k][j])) {
                        showMoveAnimate(i, j, k, j);
                        bord[k][j] += bord[i][j];
                        score += bord[k][j];
                        positionAnimate(score, bord[k][j]);
                        bord[i][j] = 0;
                        hasConflicted[k][j] = true;
                        continue;
                    } else if (bord[k][j] == 0 && noBlockVertial(i, k, j, bord)) {
                        showMoveAnimate(i, j, k, j);
                        bord[k][j] = bord[i][j];
                        bord[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () { updateBoardView(bord)}, 210);
    return true;
}

function moveUp(bord) {
    if (!canMoveUp(bord)) {
        return false;
    }
    for (var i = 1; i < n; i++) {
        for (var j = 0; j < n; j++) {
            if (bord[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if ((bord[i][j] == bord[k][j] && noBlockVertial(k, i, j, bord) && !hasConflicted[k][j])) {
                        showMoveAnimate(i, j, k, j);
                        bord[k][j] += bord[i][j];
                        score += bord[k][j];
                        positionAnimate(score, bord[k][j]);
                        bord[i][j] = 0;
                        hasConflicted[k][j] = true;
                        continue;
                    } else if (bord[k][j] == 0 && noBlockVertial(k, i, j, bord)) {
                        showMoveAnimate(i, j, k, j);
                        bord[k][j] = bord[i][j];
                        bord[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(function () {
        updateBoardView(bord);
    }, 210);
    return true;
}
function isGameover() {

    if (nospace(bord) && !canMove(bord)) {
        end.play();
        gameOver();
    }
}
function gameOver() {
    canScroll = false;
    isGaming = false;
    showScroe();
    location.href = "#scrossShow";
}
//lastPosition lastScorce
function showScroe() {
    $("#lastPosition").text(getTextValue(currentPosition));
    $("#lastScorce").text(curScore);
}

//狙击手工作cellSpace + cellSideLength

function sniperWork() {
    time = 3;
    $("#sniperBtn").on("tap", function () {
        if (times == 0) { alert("狙击手全部阵亡啦！长官"); return; }
        sniperState = true;
        $gridcontainer.css("background-color", "red").css("border-color","yellow");
        $gridcontainer.on("tap", function (e) {
            var x = e.pageX, y = e.pageY, x1 = $gridcontainer.offset().left, y1 = $gridcontainer.offset().top;
            var i = Math.floor((y - y1 - gridContainerBorder) / (cellSpace + cellSideLength));
            var j = Math.floor((x - x1 - gridContainerBorder) / (cellSpace + cellSideLength));
            console.log(i + ":" + j);
                sniperCell(i, j);
        })
    })
}

function sniperCell(i, j) {
    if (i>=0&&i<n && j>=0&&j<n){
        if (bord[i][j] == 0) return;
        times--;
        bord[i][j] = 0;
        
       
        $gridcontainer.unbind();
      
        var numbercell = $("#number-cell-" + i + "-" + j)[0];
        var shock = new SKclass(numbercell, 20, 50);
        shock.start();
        setTimeout(function () {
           
            sniperState = false;
            shock.stop();
            prepareForMobile();
            updateBoardView(bord);
            sniperTextAnimation();
        },600);
       
    }
}
function sniperTextAnimation() {
    $("#sniperBtn").find("span").text(times).animate({ "font-size": "40px", "opacity": "0.2" }, 100).animate({ "font-size": "15px", opacity: 1 }, 100);

}

function clone(lasBord, curBord) {
    // lastBord = bord.concat();
    for (var i = 0; i < n; i++) {
        lasBord[i] = [];
        for (var j = 0; j < n; j++) {
            if (typeof curBord[i][j] == "undefined") {
                lasBord[i][j] = 0;
            } else {
                lasBord[i][j] = curBord[i][j];
            }
        }
    }
}

function backStep() {
    $("#backOneStep").on("tap", function () {
        if (lastBord.length) {
            clone(bord, lastBord, curScore, lastScore, currentPosition, lastPosition);
            setTimeout(function () {
                updateBoardView(lastBord);
                score= curScore = lastScore;
                currentPosition = lastPosition;
                $("#score").text(curScore);
                $("#position").text(getTextValue(currentPosition));
            }, 210);
            console.log(lastBord);
            console.log(lastScore+":"+curScore);
            console.log(lastPosition + ":" + currentPosition);
        }
    })
}
















//抖动类
function SKclass(obj, Rate, speed) {
    var oL = obj.offsetLeft;
    var oT = obj.offsetTop;
    this.stop = null;
    this.oTime = null;
    this.state = 0;
    var om = this;
    this.start = function () {
        if (this.state == 0) {
            ostart();
            this.state = 1;
        }
    }
    var ostart = function () {
        if (parseInt(obj.style.left) == oL - 2) {
            obj.style.top = oT + 2 + "px";
            setTimeout(function () { obj.style.left = oL + 2 + "px" }, Rate)
        }
        else {
            obj.style.top = oT - 2 + "px";
            setTimeout(function () { obj.style.left = oL - 2 + "px" }, Rate)
        }
        om.oTime = setTimeout(function () { ostart() }, speed);
    }
    this.stop = function () {
        clearTimeout(om.oTime);
        this.state = 0;
    }
}
