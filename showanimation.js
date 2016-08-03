//显示动画
function showNumberWithAnimation(i, j, number) {
    var numberCell = $("#number-cell-" + i + "-" + j);
    numberCell.css("background-color", getNumberBackgroundColor(number)).css("color", getNumberColor(number)).css("border-radius", 0.1 * cellSideLength + "px").text(getTextValue(number));
    numberCell.animate({
        width: (cellSideLength - 2) * 1.1,
        height: (cellSideLength - 2) * 1.1,
        top: getPos(i) +cellSideLength*0.01,
        left: getPos(j) + cellSideLength * 0.01
    }, 100);
    numberCell.animate({
        width: (cellSideLength - 2) ,
        height: (cellSideLength - 2) ,
        top: getPos(i) + 1 ,
        left: getPos(j) + 1 
    }, 100);
}

function showMoveAnimate(fromX, fromY, toX, toY) {
    var numberCell = $("#number-cell-" + fromX + "-" + fromY);
    numberCell.animate({
        top: getPos(toX) + 1,
        left: getPos(toY) + 1
    }, 200);
}

function positionAnimate(score, positionNum) {
    if (score > curScore)
    {
        curScore = score;
        $("#score").text(curScore).animate({ "font-size": "40px", "opacity": "0.2" }, 100).animate({ "font-size": "15px", opacity: 1 }, 100);
        eat.play();
    }
   
  
    if (positionNum > currentPosition) {

        currentPosition = positionNum;
        if (currentPosition >= 64) {
            times++;
            sniperTextAnimation();
        }
           
        if (currentPosition == 16) {
            huanhu.play();
            $gridcontainer.append($addArmyJun); $addArmyJunfont
            $gridcontainer.append($addArmyJunfont)
            addCai($addArmyJun, 4000);
            addCai($addArmyJunfont, 2000);
           
                n = 5;
                preperCon();
                prepareForMobile();
                initSen();
                sniperTextAnimation();
        } else {
            $("#position").text(getTextValue(currentPosition)).animate({ "font-size": "40px", "opacity": "0.2" }, 100).animate({ "font-size": "15px", opacity: 1 }, 100);
            tuixiu();//退休字样
            addCai($addArmy, 1000);
            position.play();//音乐播放
        }
    }
}

function initSen() {
    bord[4] = [];
    hasConflicted[4] = [];
    for (var i = 0; i < n; i++) {
        bord[i][4] = 0;
        bord[4][i] = 0;
    }
   
    $("#score").text(curScore).animate({ "font-size": "40px", "opacity": "0.2" }, 100).animate({ "font-size": "15px", opacity: 1 }, 100);
    $("#position").text(getTextValue(currentPosition)).animate({ "font-size": "40px", "opacity": "0.2" }, 100).animate({ "font-size": "15px", opacity: 1 }, 100);
    updateBoardView(bord);
}

function addCai($ele,time) {
    $ele.css("top", gridContainerWidth / 2).css("left", gridContainerWidth / 2).css("display", "").css("opacity",1);
    $ele.delay(time).animate({ "opacity": 0 }, time);
    setTimeout(function () {
        huanhu.pause();
    },7000)  
}
