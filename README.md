# mobile-annotator




## 简介

一个手机App，跨平台功能无所谓，但要求能较好地适配各种分辨率，语言为中文。该App主要的功能是，能够实时的采集、显示乒乓球比赛的数据。即在比赛的同时，用户需要能够一边在现场观看比赛，一边使用该App录入数据；录入结束后，需要实时显示统计表格。


## Author
Guan-de Wu (吴冠德) (guadewu@gmail.com)


如果遇到代码问题或者无法解决的依赖问题，请联系我。

## Run & Build

```
react-native run-android
```




## Dependency

系统依赖由npm/yarn管理，写在package.json中，只需要在命令行执行：

```
npm install
```
或者
```
yarn add
```
即可。



npm可能存在一些bug，具体遇到问题可以联系我。


## Architecture

系统基于React-native编写，采取component的方式，使用Redux进行状态管理。

### UI模块

系统UI分为如下界面，
- 登陆界面
- 比赛列表界面
- 比赛基本信息设置
- 单打比赛记录
- 双打比赛记录
- 单打比赛查看
- 双打比赛查看

#### 登陆界面
文件：`pages/Login.js`


#### 比赛列表界面
文件：`pages/Overview.js`

#### 比赛基本信息设置
文件：`components/AnnotationSettingUp.js`


#### 单打比赛记录
文件：`components/AnnotationTableSingle1.js`


#### 双打比赛记录
文件：`components/AnnotationTableDouble1.js`


#### 单打比赛查看
文件：


#### 双打比赛查看
文件：


