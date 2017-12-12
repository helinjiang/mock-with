import DataItem from './data-item';
import { getRandomIndex } from './tools';

export default class DataMockController {
    constructor(list = []) {
        /**
         * 存储的数据结构为 [{DataItem},{DataItem}]
         * @type {Array}
         */
        this.store = [];

        this._cachedRandomQueue = [];

        this.addList(list);
    }

    /**
     * 追加数组数据到仓库中
     * @param {Array} list
     */
    addList(list = []) {
        let self = this;

        list.forEach(function (item) {
            self.addOne(item);
        });
    }

    /**
     * 追加一个数据到仓库中
     * @param {String || Number || Object} value
     * @param {Array} [tags] 标签数组
     */
    addOne(value, tags = []) {
        let newDataItem = new DataItem(value, tags);

        // 如果已经存在，则不再新增，而是更新之
        let filterResult = this.store.filter((item) => {
            return item.isMe(newDataItem.value);
        });

        if (filterResult.length) {
            let existDataItem = filterResult[0];
            console.log('exist, new', existDataItem, newDataItem);
            Object.assign(existDataItem, newDataItem);
            return;
        }

        this.store.push(newDataItem);
    }

    /**
     * 获得随机一个值
     */
    getRandom() {
        // 如果没有任何初始数据，则抛出异常
        if (!this.store.length) {
            throw new Error('no list!');
        }

        // 如果缓存已满，则清空
        if (this._cachedRandomQueue.length >= this.store.length) {
            this._cachedRandomQueue = [];
        }

        // 找到目标的随机数
        while (true) {
            // 首先生成随机一个数
            let randomIndex = getRandomIndex(this.store);

            // 如果该随机数未被使用，则停止
            if (this._cachedRandomQueue.indexOf(randomIndex) < 0) {
                this._cachedRandomQueue.push(randomIndex);
                break;
            }
        }

        // 因为新生成的随机数一定是在队列的最后，所以直接取最后一个值即可
        return this.store[this._cachedRandomQueue[this._cachedRandomQueue.length - 1]].getData();
    }

    /**
     * 通过指定的 tag 找到对应的数据
     * @param {String | Array} tags
     * @param {Boolean} [isStrict] 是否是严格模式，该模式下需要同时满足要求
     * @return {Array}
     */
    getDataByTag(tags, isStrict) {
        if (!Array.isArray(tags)) {
            tags = [tags];
        }

        let filterResult = this.store.filter((item) => {
            return item.isMyTag(tags, isStrict);
        });

        return filterResult;
    }
}

