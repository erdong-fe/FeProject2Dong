# 任务4：奔跑的小车
**该任务有一定难度，大家加油**

任务4是做一个可以使用键盘操作的小车，使用键盘的上下左右方向键来控制小车的移动，为我们的下一个任务做准备

### 在线预览
[github预览链接](https://erdong-fe.github.io/FeProject2Dong/01.JavaScript/04.MovingCar/demo.html)

### 项目使用知识点
1. flex布局学习：[链接](https://zhuanlan.zhihu.com/p/25303493)
2. javascript事件监听：[链接](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
3. 键盘事件：[链接](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)
4. 浏览器本地存储localstorage：[链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
5. css定位position：[链接](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)

### 项目要求
0. 任务只要求在电脑端运行，不要求做移动端适配
1. 按下键盘的↑↓←→方向键，界面上的小车会向着相应的方向移动，并且车头始终会朝着前进方向
2. 页面顶部有两个下拉选择框，一个是速度，另一个是车型
    - 速度下拉选：选项从1到10，默认为1，改变该选项后，再次按下方向键时，小车将以最新的选中速度来移动
    - 车型下拉选：选项为预览页面中的这些，默认为拖拉机，改变该选项后，小车将展示为最新的选中车型
3. 在界面上改变速度、车型选项或移动小车后，刷新页面后，页面展示的依然是刷新页面前的速度、车型、小车位置、车头方向