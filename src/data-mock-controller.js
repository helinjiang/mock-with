import DataItem from './data-item';

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

    isExist(data) {
        if (!data || !data.id) {
            return false;
        }

        return !!this.getDataByKey(data.id);
    }

    getDataByKey(key = '') {
        let filterResult = this.store.filter((item) => {
            return item.isMe(key);
        });

        // if (filterResult.length !== 1) {
        //     throw new Error(`dirty data for ${key}`);
        // }

        return filterResult[0];
    }

    addList(list = []) {
        let self = this;

        list.forEach(function (item) {
            self.addOne(item);
        });
    }

    addOne(data, key, tags = []) {
        // 如果是符合的数据格式，则对比是否已经存在了这个数据
        if (this.isExist(data)) {
            console.log('exist', data);
            return;
        }

        this.store.push(new DataItem(data, key, tags));
    }

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
            let randomIndex = parseInt(Math.random() * this.store.length + '');

            // 如果该随机数未被使用，则停止
            if (this._cachedRandomQueue.indexOf(randomIndex) < 0) {
                this._cachedRandomQueue.push(randomIndex);
                break;
            }
        }

        // 因为新生成的随机数一定是在队列的最后，所以直接取最后一个值即可
        return this.store[this._cachedRandomQueue[this._cachedRandomQueue.length - 1]].data;
    }
}

