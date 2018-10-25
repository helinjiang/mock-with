# mock-with

构建桩数据仓库，并从中获取指定或随机的桩数据。

## 1. 特性

- 快速简易的创建桩数据仓库
- 为桩数据打标签，可返回指定的数据
- 随机返回一个或多个桩数据

## 2. 安装

```
npm install mock-with --save
```

## 3. 使用简介

```javascript
const mockWith = require('mock-with');

let arr = [
    new mockWith.StoreItem('周杰伦', ['male', 'singer']),
    new mockWith.StoreItem('周星驰', ['male', 'actor', 'director']),
    new mockWith.StoreItem('刘德华', ['male', 'singer', 'actor']),
    new mockWith.StoreItem('巩俐', ['female', 'actor']),
    new mockWith.StoreItem('张艺谋', ['male', 'director']),
    new mockWith.StoreItem('蔡依林', ['female', 'singer']),
    new mockWith.StoreItem('汤姆·克鲁斯', ['male', 'actor', 'Tom Cruise']),
    'Angelababy',
    '黄晓明'
];

let mockWithItem = new mockWith.Store(arr);

// 1. 从数据仓库中获取随机 1 个数据
console.log(mockWithItem.getOne());

// 2. 从数据仓库中获取随机 3 个数据列表
console.log(mockWithItem.getSome(3));

// 3. 从数据仓库中获取随机 1 个指定标签为 female 的数据
console.log(mockWithItem.getOne('female'));

// 4. 当设置了一个特殊标签时，等效于指定返回某个特定的数据
console.log(mockWithItem.getOne('Tom Cruise'));

// 5. 从数据仓库中获取随机 3 个指定标签为 male 的数据列表
console.log(mockWithItem.getSome(3, 'male'));

// 6. 从数据仓库中获取随机 2 个指定标签为 actor 的数据列表
console.log(mockWithItem.getSome(2, 'actor'));
```

## 4. API

### 4.1 Store

桩数据仓库类

#### 4.1.1 constructor(list = [])

构造函数支持传入一个数组，数组元素将会被自动存入到桩数据仓库中。

- `list`，必选，桩数据列表，为 `Array` 类型。该数组的元素可以是任意值，参考 `addOne` 方法中的 `value` 参数值

#### 4.1.2 addOne(value, tags = [])

追加一个桩数据到仓库中。

- `value`，必选，桩数据的值，可以是 `String`、`Number`、`Object` 或任意的值。尤其注意的是它也可以为 `StoreItem` 对象
- `tags`，该桩数据的标签，为 `Array` 类型，要求该数组的元素必须为字符串

#### 4.1.3 addList(list = [])

批量追加多个桩数据到仓库中。

- `list`，必选，桩数据列表，为 `Array` 类型。该数组的元素可以是任意值，参考 `addOne` 方法中的 `value` 参数值

#### 4.1.4 getOne(tags, isStrict)

从仓库中获取一个桩数据。

- `tags`，要求过滤的标签，为 `String` 或 `Array` 类型
- `isStrict`，是否是严格模式，为 `Boolean` 类型。该值为 `true` 时，则 `tags` 中的标签都必须是该桩数据的标签，为 `false` 时，则只要有一个标签匹配即可


#### 4.1.5 getSome(total = 0, tags, isStrict)

从仓库中获取一个桩数据。

- `total`，数量，为 `Number` 类型
- `tags`，要求过滤的标签，为 `String` 或 `Array` 类型
- `isStrict`，是否是严格模式，为 `Boolean` 类型。该值为 `true` 时，则 `tags` 中的标签都必须是该桩数据的标签，为 `false` 时，则只要有一个标签匹配即可

### 4.2 StoreItem

桩数据仓库元素类

#### 4.2.1 constructor(value, tags)

- `value`，必选，桩数据的值，可以是 `String`、`Number`、`Object` 或任意的值
- `tags`，该桩数据的标签，为 `Array` 类型，要求该数组的元素必须为字符串

#### 4.2.2 getData()

获取桩数据仓库元素的值。

#### 4.2.3 isMe(value)

判断某个 `value` 是不是与自己相等，一般用于去重。如果相等则返回 `true`。

> 如果是对象，则会要求其所有的属性值都一样才为 `true`

- `value`，必选，桩数据的值，可以是 `String`、`Number`、`Object` 或任意的值。


### 4.3 getRandomIndex(list = [])

获取一个列表中的随机索引。

- `list`，必选。


### 4.4 getOneOf(list = [])

获取列表中的随机一个。

- `list`，必选。
