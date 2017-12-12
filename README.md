# mock-with

模拟数据生成管理工具


## 使用方式

```
let dataMockController = new DataMockController(['a', 'b', 'c', 'd']);

// 获取随机数据
dataMockController.getRandom();

// 获取指定 tag 的数据
dataMockController.getDataByTag(['o', 'f']);
```

`DataItem` 对象有两个属性： `value` 和 `tags`。
