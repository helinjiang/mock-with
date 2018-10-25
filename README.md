# mock-with

从多个桩数据中获取随机结果。

## 安装

```
npm install mock-with --save
```

## 使用简介

```javascript
const mockWith = require('mock-with');

let arr = [
    new mockWith.Item('周杰伦', ['male', 'singer']),
    new mockWith.Item('周星驰', ['male', 'actor', 'director']),
    new mockWith.Item('刘德华', ['male', 'singer', 'actor']),
    new mockWith.Item('巩俐', ['female', 'actor']),
    new mockWith.Item('张艺谋', ['male', 'director']),
    new mockWith.Item('蔡依林', ['female', 'singer']),
    new mockWith.Item('汤姆·克鲁斯', ['male', 'actor', 'Tom Cruise']),
    'Angelababy',
    '黄晓明'
];

let mockWithItem = new mockWith.Controller(arr);

// 从数据仓库中获取随机 1 个数据
console.log(mockWithItem.getOne());

// 从数据仓库中获取随机 3 个数据列表
console.log(mockWithItem.getSome(3));

// 从数据仓库中获取随机 1 个指定标签为 female 的数据
console.log(mockWithItem.getOne('female'));

// 从数据仓库中获取随机 3 个指定标签为 male 的数据列表
console.log(mockWithItem.getSome(3, 'male'));
```

## API

### Controller

操作类，提供了一些方法来
