
var n = 4;
var documentWidth = window.screen.availWidth < window.screen.availHeight ? window.screen.availWidth : window.screen.availHeight;
var gridContainerWidth, gridContainerBorder, cellSideLength, cellSpace;
function preperCon() {
    if (n == 4) {
        gridContainerWidth = 0.66 * documentWidth;
        gridContainerBorder = 0.03 * documentWidth;
        cellSideLength = 0.14 * documentWidth;
        cellSpace = 0.02 * documentWidth;
    } else {
        gridContainerWidth = 0.66 * documentWidth;
        gridContainerBorder = 0.03 * documentWidth;
        cellSideLength = 0.12 * documentWidth;
        cellSpace = 0.01 * documentWidth;
    }
}
function getPos(i) {
    return cellSpace + (cellSpace + cellSideLength) * i;
}

    function getNumberBackgroundColor(number) {
        switch (number) {
            case 2: return "#eee40a"; break;
            case 4: return "#ede0c8"; break;
            case 8: return "#f5b109"; break;
            case 16: return "#f09563"; break;
            case 32: return "#f07c5f"; break;
            case 64: return "#ff5e3b"; break;
            case 128: return "#edcf72"; break;
            case 256: return "#fd0361"; break;
            case 512: return "#9c0"; break;
            case 1024: return "#33b5e5"; break;
            case 2048: return "#09c"; break;
            case 4096: return "#a6c"; break;
            case 8192: return "#93c"; break;
            case 16384: return "#888"; break;
            case 32768: return "#000"; break;
            default: return "#111"; break;
        }

        return "black";
    }


    function getTextValue(number) {
        switch (number) {
            case 0: return "义务兵"; break;
            case 2: return "义务兵"; break;
            case 4: return "士官"; break;
            case 8: return "士官长"; break;
            case 16: return "排长"; break;
            case 32: return "连长"; break;
            case 64: return "营长"; break;
            case 128: return "团长"; break;
            case 256: return "旅长"; break;
            case 512: return "师长"; break;
            case 1024: return "军长"; break;
            case 2048: return "司令"; break;
            case 4096: return "总司令"; break;
            case 8192: return "副主席"; break;
            case 16384: return "主席"; break;
            case 32768: return "总书记"; break;
            default: return "GOD！"; break;
        }
        return "black";
    }
    function getCharValue(number) {
        switch (number) {
            case 0: return "再接再励"; break;
            case 2: return "为人民服务"; break;
            case 4: return "葡萄美酒夜光杯，欲饮琵琶马上催。"; break;
            case 8: return "醉卧沙场君莫笑，古来征战几人回?"; break;
            case 16: return "黄沙百战穿金甲，不破楼兰终不还。"; break;
            case 32: return "秦时明月汉时关，万里长征人未还。"; break;
            case 64: return "但使龙城飞将在，不教胡马度阴山。"; break;
            case 128: return "男儿何不带吴钩，收取关山五十州。"; break;
            case 256: return "请君暂上凌烟阁，若个书生万户侯？"; break;
            case 512: return "挽弓当挽强，用箭当用长。"; break;
            case 1024: return "射人先射马，擒贼先擒王。"; break;
            case 2048: return "杀人亦有限，列国自有疆。"; break;
            case 4096: return "苟能制侵陵，岂在多杀伤？ "; break;
            case 8192: return "军中十九从军乐，亘古英雄一放翁。"; break;
            case 16384: return "风萧萧兮易水寒，壮士一去兮不复还！"; break;
            case 32768: return "时平将士无功劳，乡远征人有梦归！"; break;
            default: return "宜将剩勇追穷寇，不可沽名学霸王！"; break;
        }
        return "black";
    }


    function getNumberColor(number) {
        if (number <= 4) {
            return "#776e65";
        }
        return "red";
    }
//检查是否有空闲
    function nospace(board) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) return false;
            }
        }
        return true;
    }
    function canMove(bord) {
        if (canMoveRight(bord) || canMoveLeft(bord) || canMoveDown(bord) || canMoveUp(bord))
            return true;
        return false;
    }


    function canMoveRight(bord) {
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n-1; j++) {
                if (bord[i][j] != 0) {
                    if (bord[i][j+1] == 0 || bord[i][j] == bord[i][j + 1])
                        return true;
                }
            }
        }
        return false;
    }
    function canMoveLeft(bord) {
        for (var i = 0; i < n; i++) {
            for (var j = 1; j < n; j++) {
                if (bord[i][j] != 0) {
                    if (bord[i][j - 1] == 0 || bord[i][j] == bord[i][j - 1])
                        return true;
                }
            }
        }
        return false;
    }
    function canMoveDown(bord) {
        for (var i = 0; i < n-1; i++) {
            for (var j = 0; j < n; j++) {
                if (bord[i][j] != 0) {
                    if (bord[i+1][j] == 0 || bord[i][j] == bord[i+1][j])
                        return true;
                }
            }
        }
        return false;
    }

    
    function canMoveUp(bord) {
        for (var i = 1; i < n; i++) {
            for (var j = 0; j < n; j++) {
                if (bord[i][j] != 0) {
                    if (bord[i - 1][j] == 0 || bord[i][j] == bord[i - 1][j])
                        return true;
                }
            }
        }
        return false;
    }


    function noBlockHorizontal(row, col, col1, bord) {
        for (var j = col + 1; j < col1; j++) {
            if (bord[row][j] != 0)
                return false;
        }
        return true;
    }

    function noBlockVertial(row, row1, col, bord) {
        for (var i = row + 1; i < row1; i++) {
            if (bord[i][col] != 0)
                return false;
        }
        return true;
    }
    function exchangePositiom(max, current) {
        if (max > current) {
            current = max;
        }
    }

//随机背景音乐

    function getBackSound() {
        if (Math.random() < 0.5) {
            fls.play();
            junGe.pause();
            junGe.load();
        } else {
            junGe.play();
            fls.pause();
            fls.load();
        }
    }
    function requestFullScreen(element) {
        // 判断各种浏览器，找到正确的方法
        var requestMethod = element.requestFullScreen || //W3C
        element.webkitRequestFullScreen ||    //Chrome等
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
        if (requestMethod) {
            requestMethod.call(element);
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    //退出全屏 判断浏览器种类
    function exitFull() {
        // 判断各种浏览器，找到正确的方法
        var exitMethod = document.exitFullscreen || //W3C
        document.mozCancelFullScreen ||    //Chrome等
        document.webkitExitFullscreen || //FireFox
        document.webkitExitFullscreen; //IE11
        if (exitMethod) {
            exitMethod.call(document); 
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }