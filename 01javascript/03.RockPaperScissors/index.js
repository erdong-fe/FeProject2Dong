const selectDialog = document.querySelector("#select-dialog");
const selectForm = document.querySelector("#select-form");
const submitSelectBtn = document.querySelector("#submit-select");
const gestureSelect = document.querySelector("#gesture-select");
const resultOfThisRound = document.querySelector(".result-of-this-round");
const startThisRoundBtn = document.querySelector("#start-this-round-btn");
// 手势图片的枚举
const GestureImg = {
    rock: "./images/rock.png",
    scissor: "./images/scissor.png",
    paper: "./images/paper.png",
}
// 名称的枚举
const Name = {
    computer: "机器人",
    my: "你"
}
const Gestures = ["rock", "scissor", "paper"];
// 总的回合数
const MaxRoundNum = 3;
let roundIndex = 1;
// 电脑和我的输赢情况
const computerScore = {
    win: 0,
    lose: 0
};
const myScore = {
    win: 0,
    lose: 0,
}

// 初始化游戏，包含展示弹窗，绑定事件等等
function initGame() {
    // renderRoundInfo(roundIndex, MaxRoundNum);
    startThisRoundBtn.addEventListener(
        "click",
        () => {
            selectDialog.showModal();
        }
    )
    selectForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();
            const myGesture = gestureSelect.value;
            renderMyGesture(myGesture);
            const computerGesture = renderComputerGesture();
            selectDialog.close();
            judgeOneRoundWinAndLose(computerGesture, myGesture);
        }
    )
}
// 渲染我方出的是什么手势
function renderMyGesture(selectedGesture) {
    const theImgSrc = GestureImg[selectedGesture];
    const myGestureWrapper = document.querySelector(".my .gesture");
    myGestureWrapper.innerHTML = `<img class="my-img" src=${theImgSrc} />`
}
// 渲染电脑方出的是什么手势，随机的
function renderComputerGesture() {
    // 生成0~2之间的随机数，通过随机数我们可以在Gestures数组里面模拟石头剪刀布的随机性
    const random = Math.floor(Math.random()*3);
    const theGesture = Gestures[random];
    const theImgSrc = GestureImg[theGesture];
    const computerGestureWrapper = document.querySelector(".computer .gesture");
    computerGestureWrapper.innerHTML = `<img class="computer-img" src=${theImgSrc} />`

    return theGesture;
}
// 渲染回合数
function renderRoundInfo(curRound, totalRound) {
    const roundDom = document.querySelector(".round");
    roundDom.innerHTML = `第${curRound}回合（共${totalRound}回合）`;
}
// 渲染机器人和我的输赢数据
function renderScore() {
    const computerScoreDom = document.querySelector(".computer .score");
    computerScoreDom.innerHTML = `胜：${computerScore.win} | 负：${computerScore.lose}`;
    const mySocreDom = document.querySelector(".my .score");
    mySocreDom.innerHTML = `胜：${myScore.win} | 负：${myScore.lose}`;
}
// 判断本回合的输赢
function judgeOneRoundWinAndLose(computer, my) {
    let thisRoundRes = ""
    // 是否我赢
    let isMyWin = true;
    if (computer === my) {
        thisRoundRes = "本回合平";
    } else {
        if (computer === "rock") {
            if (my === "scissor") {
                isMyWin = false;
            } else {
                isMyWin = true;
            }
        } else if (computer === "scissor") {
            if (my === "rock") {
                isMyWin = true;
            } else {
                isMyWin = false;
            }
        } else {
            if (my === "rock") {
                isMyWin = false;
            } else {
                isMyWin = true;
            }
        }

        if (isMyWin) {
            thisRoundRes = "本回合你赢";
            myScore.win++;
            computerScore.lose++;
        } else {
            thisRoundRes = "本回合机器人赢";
            computerScore.win++;
            myScore.lose++;
        }
    }

    resultOfThisRound.innerHTML = thisRoundRes;
    renderScore();
    renderRoundInfo(roundIndex, MaxRoundNum);

    if (roundIndex === MaxRoundNum) {
        if (computerScore.win > myScore.win) {
            finishGame("computer");
        } else if (myScore.win > computerScore.win) {
            finishGame("my");
        } else {
            finishGame()
        }
    } else {
        if (computerScore.win === 2) {
            finishGame("computer");
            return;
        } else if (myScore.win === 2) {
            finishGame("my");
            return;
        }
        roundIndex++;
    }
}
// 游戏结束，隐藏“开始本回合”的按钮，并且提示胜方
// 接收参数为my或者computer，如果是my说明是我赢了，如果是computer说明是机器人赢了，不传说明是平局
function finishGame(winner) {
    selectDialog.close();
    startThisRoundBtn.style.display = "none";
    const resultOfTotalRound = document.querySelector(".result-of-total-round");
    if (!winner) {
        resultOfTotalRound.innerHTML = "不错嘛，平局了";
    } else {
        resultOfTotalRound.innerHTML = `
            (≧v≦)o~~好棒，恭喜${Name[winner]}获得胜利！
        `;
    }
}

initGame();