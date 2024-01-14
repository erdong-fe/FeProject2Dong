// 键盘上下左右按键Keycode和方向的对应关系
const KeyCode = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
};
// 方向键的codekey
const DirectionCodeKey = [
    37, 38, 39, 40
];
// 火车车厢长度
const TrainNodeLength = 22;
// 游戏区域的尺寸
const gameMapSize = {
    width: 1100,
    height: 770
};
// 和游戏相关的dom
let gameMapDom = null;
let bgmAudioDom = null;
let bgmSelectDom = null;
let bonusDom = null;
// 保存的localstorage key
const StorageKey = 'Task4_Key';
// 车头方向
let trainHeadDirection = 'right';
// 保存火车的节点位置数据
let trainList = [
    {
        top: 0,
        left: 0,
        direction: 'right',
    },
    {
        top: 0,
        left: 22,
        direction: 'right',
    },
    {
        top: 0,
        left: 44,
        direction: 'right',
    },
];

// 初始化游戏
function initGame() {
    // 初始化后面将要用到的dom
    gameMapDom = document.querySelector('.game-map');
    bgmAudioDom = document.querySelector('#bgm');
    bgmSelectDom = document.querySelector('#playBgm');
    bonusDom = document.querySelector('.bonus');
    // 初始化键盘方向监听事件、播放背景音乐事件
    listenKeyboardDirection();
    listenBgmSelect();
    // renderBonus();
    renderTrain(trainList);
    runTrain();
}

// 监听播放背景音乐的选择
function listenBgmSelect() {
    bgmSelectDom.addEventListener('change', function (event) {
        playBgm(event.target.value);
    })
}
// 监听键盘事件来响应上下左右按键
function listenKeyboardDirection() {
    window.addEventListener('keydown', function (event) {
        const keyCode = event.keyCode;
        const directionFromKeyboard = KeyCode[keyCode];
        // 先检测键盘上是否按的是方向键
        if (DirectionCodeKey.includes(keyCode)) {
            // 如果按下的方向键和当前的方向正好相反，那么就认为是无效的，比如说当前火车正在往右开，但是按下了左方向键盘
            if ((trainHeadDirection === 'right' && directionFromKeyboard === 'left' )
                || trainHeadDirection === 'down' && directionFromKeyboard === 'up'
                || trainHeadDirection === 'left' && directionFromKeyboard === 'right'
                || trainHeadDirection === 'up' && directionFromKeyboard === 'down'
            ) {
                return;
            }
            changeTrainDirection(directionFromKeyboard);
        }
    })
}

// 让火车跑起来的方法，使用定时器的做
function runTrain() {
    const _move = function (direction) {
        // detectEatBonus();
        for(let index = 0;index < trainList.length;index++) {
            const trainNodeData = trainList[index];
            if (direction === 'right') {
                // trainList数组的最后一个数据是车头，需要特殊处理
                if (index === trainList.length-1) {
                    trainNodeData.left += TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[index+1].top;
                    trainNodeData.left = trainList[index+1].left;
                    trainNodeData.direction = trainList[index+1].direction;
                }
            } else if (direction === 'down') {
                // trainList数组的最后一个数据是车头，需要特殊处理
                if (index === trainList.length-1) {
                    trainNodeData.top += TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[index+1].top;
                    trainNodeData.left = trainList[index+1].left;
                    trainNodeData.direction = trainList[index+1].direction;
                }
            } else if (direction === 'left') {
                // trainList数组的最后一个数据是车头，需要特殊处理
                if (index === trainList.length-1) {
                    trainNodeData.left -= TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[index+1].top;
                    trainNodeData.left = trainList[index+1].left;
                    trainNodeData.direction = trainList[index+1].direction;
                }
            } else if(direction === 'up') {
                // trainList数组的最后一个数据是车头，需要特殊处理
                if (index === trainList.length-1) {
                    trainNodeData.top -= TrainNodeLength;
                } else {
                    trainNodeData.top = trainList[index+1].top;
                    trainNodeData.left = trainList[index+1].left;
                    trainNodeData.direction = trainList[index+1].direction;
                }
            }
        } 

        renderTrain();
    };
    setInterval(() => {
        _move(trainHeadDirection);
    }, 300);
}
// 根据键盘操作来改变火车方向，这里需要做两件事情：
//      1. 改变全局变量trainHeadDirection来记录火车的方向
//      2. 改变trainList数据中火车头的方向数据以及位置数据
function changeTrainDirection(direction) {
    trainHeadDirection = direction;
    trainList[trainList.length-1].direction = direction;
}
// 根据火车的车厢节点数据List来渲染火车
function renderTrain() {
    let trainNodeDomList = document.querySelectorAll(".train-node");
    // if (trainNodeDomList.length < trainList.length) {
    //     const newTrainNodeDom = document.createElement('img');
    //     newTrainNodeDom.style.left = `${trainList[0].left}px`;
    //     newTrainNodeDom.style.top = `${trainList[0].top}px`;
    //     newTrainNodeDom.classList.add('train-node');
    //     gameMapDom.insertBefore(newTrainNodeDom, trainNodeDomList[0]);
    //     trainNodeDomList = document.querySelectorAll(".train-node");
    // }
    // console.log(trainNodeDomList);
    
    for(let index = 0;index < trainList.length;index++) {
        const trainNodeData = trainList[index];
        const trainNodeDom = trainNodeDomList[index];
        // 设置每个车厢节点的位置
        trainNodeDom.style.left = `${trainNodeData.left}px`;
        trainNodeDom.style.top = `${trainNodeData.top}px`;
        // 先清空车厢节点的方向，方便后续设置正确的方向
        trainNodeDom.classList.remove('car-left', 'car-up', 'car-right', 'car-down');
        // 然后再根据键盘操作来加上相应方向的类
        switch (trainNodeData.direction) {
            case 'up':
                trainNodeDom.classList.add('car-up');
                break;
            case 'right':
                trainNodeDom.classList.add('car-right');
                break;
            case 'down':
                trainNodeDom.classList.add('car-down');
                break;  
            case 'left':
                trainNodeDom.classList.add('car-left');
                break;  
            default:
                break;
        }
    }
}
// 检测是否吃到钱
function detectEatBonus() {
    const bonusClientRect = bonusDom.getBoundingClientRect();
    const trainHeadClientRect = document.querySelector('.train-head').getBoundingClientRect();
    switch (trainHeadDirection) {
        case 'right':
            if (trainHeadClientRect.top === bonusClientRect.top
                && (trainHeadClientRect.left+22) >= bonusClientRect.left) {
                // 车尾车厢的数据，根据它来确定新的车尾车厢的数据
                const trainTailData = trainList[0];
                const newTrainTailData = {
                    direction: trainTailData.direction,
                    left: trainTailData.left-22,
                    top: trainTailData.top
                };
                trainList.unshift(newTrainTailData);
            }
            break;
        case 'down':
        
            break;
        case 'left':
        
            break;
        case 'up':
        
            break;
        default:
            break;
    }
}


// 随机生成一个位置然后渲染出车票
function renderBonus() {
    // 生成随机位置
    const randomLeft = Math.floor(Math.random()*(gameMapSize.width/22))*22;
    const randomTop = Math.floor(Math.random()*(gameMapSize.height/22))*22;
    bonusDom.style.left = `${randomLeft}px`;
    bonusDom.style.top = `${randomTop}px`;
    gameMapDom.appendChild(bonusDom);
}

/**
 * 播放背景音乐
 * @param {*} flag 如果flag是yes，播放音乐；如果flag是no，停止音乐
 */
function playBgm(flag) {
    if (flag === 'yes') {
        bgmAudioDom && bgmAudioDom.play();
    } else {
        bgmAudioDom && bgmAudioDom.pause();
    }
}

initGame();