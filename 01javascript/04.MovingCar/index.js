// 键盘上下左右对应的Keycode
const KeyCode = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
};
// 车型对应的图片资源
const CarTypeImg = {
    tractors: './images/car1.png',
    truck: './images/car2.png',
    motor: './images/car3.png',
    roadster: './images/car4.png',
    electromobile: './images/car5.png',
    bike: './images/car6.png'
}

// 和游戏相关的dom
let gameMapDom = null;
let carDom = null;
let speedSelectDom = null;
let carTypeSelectDom = null;

// 保存的localstorage key
const StorageKey = 'Task4_Key';
// 车头方向
let carHeadDirection = 'right';

// 初始化游戏
function initGame() {
    // 初始化后面将要用到的dom
    gameMapDom = document.querySelector('.game-map');
    carDom = document.querySelector('.car');
    speedSelectDom = document.querySelector('#speed');
    carTypeSelectDom = document.querySelector('#carType');
    // 初始化监听事件
    listenKeyboardDirection();
    listenCarSelectChange();
    listenSpeedSelectChange();
    // 从localStorage中读取之前保存的数据，取出来时是字符串，需要用JSON.parse解析一下
    // 如果什么都不存的话，取出来是null
    const data = JSON.parse(localStorage.getItem(StorageKey));
    if (data) {
        speedSelectDom.value = data.speed;
        carTypeSelectDom.value = data.carType;
        carDom.style.left = data.position.left;
        carDom.style.top = data.position.top;
        renderCar(data.carType);
        changeCarHeadDirection(data.headDirection);
    }
}
// 监听键盘事件来响应上下左右按键
function listenKeyboardDirection() {
    window.addEventListener('keydown', function (event) {
        const keyCode = event.keyCode;
        moveCar(keyCode);
        saveToStorage();
    })
}
// 监听车型切换
function listenCarSelectChange() {
    carTypeSelectDom.addEventListener('change', function (event) {
        renderCar(event.target.value);
        saveToStorage();
    })
}
// 监听速度切换
function listenSpeedSelectChange() {
    speedSelectDom.addEventListener('change', function () {
        saveToStorage();
    })
}
// 移动汽车
function moveCar(keyCode) {
    // 修改汽车dom的style，抽象成方法
    // 如果是往左或者右移动，那么只需要修改绝对定位的left属性即可
    // 往右移动是增加left的值，往左移动是减少left的值
    // 往上移动是减少top的值，往下移动是增加top的值
    const _move = function (direction) {
        const computedStyle = window.getComputedStyle(carDom);
        // 获取当前最新的速度
        const curSpeed = parseInt(speedSelectDom.value);
        let valtWithPX, valWithNumber;
        // 移动后最新的left和top值，待计算
        let newLeft = 0, newTop = 0;
        if (direction === 'left' || direction === 'right') {
            valtWithPX = computedStyle.left;
            valWithNumber = parseInt(valtWithPX.slice(0, valtWithPX.length-2));
            if (direction === 'left') {
                newLeft = valWithNumber - curSpeed;
            } else {
                newLeft = valWithNumber + curSpeed;
            }
            carDom.style.left = `${newLeft}px`;
        } else {
            valtWithPX = computedStyle.top;
            valWithNumber = parseInt(valtWithPX.slice(0, valtWithPX.length-2));
            if (direction === 'down') {
                newTop = valWithNumber + curSpeed;
            } else {
                newTop = valWithNumber - curSpeed;
            }
            carDom.style.top = `${newTop}px`;
        }
    };
    // 键盘的方向
    let direction;
    switch (keyCode) {
        case KeyCode.left:
            direction = 'left';
            break;
        case KeyCode.up:
            direction = 'up';
            break;
        case KeyCode.right:
            direction = 'right';
            break;
        case KeyCode.down:
            direction = 'down';
            break;
        default:
            break;
    }
    changeCarHeadDirection(direction);
    _move(direction);
}
// 改变车头的方向，这里我们使用修改类名的方式来做，提前把各个方向的css类名写好
function changeCarHeadDirection(direction) {
    carHeadDirection = direction;
    // 先去掉所有方向的类
    carDom.classList.remove('car-left', 'car-up', 'car-right', 'car-down');
    // 然后再根据键盘操作来加上相应方向的类
    switch (direction) {
        case 'up':
            carDom.classList.add('car-up');
            break;
        case 'right':
            carDom.classList.add('car-right');
            break;
        case 'down':
            carDom.classList.add('car-down');
            break;  
        case 'left':
            carDom.classList.add('car-left');
            break;  
        default:
            break;
    }
}
// 渲染车，用来在切换车型后重新绘制车
function renderCar(carType) {
    const img = CarTypeImg[carType];
    carDom.src = img;
}
// 保存当前最新的速度、车型、车位置、方向到localstorage，以供下次页面刷新后读取
// 为了方便起见，每次都把这些数据都保存一次
function saveToStorage() {
  const curSpeed = speedSelectDom.value;
  const curCarType = carTypeSelectDom.value;
  const carPositionLeft = carDom.style.left;
  const carPositionTop = carDom.style.top;

  const objToSave = {
    speed: curSpeed,
    carType: curCarType,
    position: {
        left: carPositionLeft,
        top: carPositionTop
    },
    headDirection: carHeadDirection,
  }

  localStorage.setItem(StorageKey, JSON.stringify(objToSave));
}
initGame();