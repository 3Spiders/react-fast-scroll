## react-fast-scroll

---

## 前言

这是一个上拉加载，下拉刷新的组件。在 Android 和 RN（React Native）里称为 滚动容器（ScrollView）。这个项目是基于CRA（Create React App）搭建的，代码全部采用 TS（TypeScript）编写，核心引擎部分不掺杂框架代码，如果使用React，Vue，Angular，或者原生JS的，可以自己扩展，目前只支持React版本。在设计之初，借鉴了 minirefresh 和 better-scroll 的设计，它们都是很不错的滚动组件。

## 快速开始

```
npm install react-fast-scroll

# 或者
yarn add react-fast-scroll
```

## 最小原型

下面是采用函数组件的写法。传入上拉（pullUp），下拉（pullDown）回调。

```js
const Demo = () => {
  const pullDown = () => {
    console.log('pullDown');
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('pullDown resolve');
        resolve(false);
      }, 2000);
    });
  };

  const pullUp = () => {
    console.log('pullUp');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(false);
        console.log('pullUp resolve');
      }, 2000);
    });
  };

  return (
    <ScrollView
      pullDown={pullDown}
      pullUp={pullUp}
    >
      <div>滚动内容</div>
    </ScrollView>
  )
}
```

## 查看Demo

我们准备了很多使用例子，全在 example目录下，启动项目，即可看到效果。

下载项目到本地并且切换到项目根目录

```
yarn install

yarn start
```

## 原理

下拉刷新。实际上是利用 touch 事件，判断当滚动容器的 scrollTop 为0时，解锁 touch 事件，记录用户的下拉的距离，用 transform 同步下移视图。

上拉加载。利用 scroll 事件，监听元素的滚动事件，用容器滚动的总高度（scrollHeight），减去 当前区域可见高度（clientHeight ）和 scrollTop，当这个值小于等于零时，代表已经到底，可以触发上拉事件。

## API文档

参数设置

参数 | 值类型 | 默认值 | 含义
------ |----- | ------ |-----
container | HTMLElement |  | 滚动容器的DOM 
isUseBodyScroll | boolean | false | 是否使用body滚动，如果是全屏滚动，开启之后可优化性能，但是每一个页面只允许拥有一个滚动实例
isLockX | boolean | false | 设置是否锁定纵向的滚动
throttle | boolean | false | 是否开启滚动截流
throttleTime | number | 0 | 滚动截流的时间间隔
isScrollBar | boolean | true | 是否有滚动条
down | object |  | 下拉刷新配置项
down.enable | boolean | true | 是否允许下拉
down.offset | number | 100 | 移动多少距离，才能触发下拉条件
down.bounceTime | number | 300 | 下拉之后，下拉区域的回弹速度
down.dampRateBegin | number | 1 | 阻尼系数，下拉小于offset时的阻尼系数，越小越难拉。
down.dampRate | number | 1 | 阻尼系数，下拉超过阈值后的阻尼系数，越小越难拉。
up | object |  | 上拉加载配置项
up.enable | boolean | true | 是否允许上拉
up.offset | number | 0 | 距离底部多少距离，触发上拉加载
up.isAutoLoad | boolean | true | 进入页面，自动调下拉接口
up.loadFull |  object | | 当数据不足一屏幕时的配置项
up.loadFull.enable |  boolean | true | 是否让ScrollView帮你自动加载后面的数组
up.loadFull.loadCount |  number | 3 | 连续加载多少次

## License

The MIT License (MIT)

Copyright (c) 2020 Peter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

