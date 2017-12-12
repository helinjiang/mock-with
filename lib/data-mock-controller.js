'use strict';

exports.__esModule = true;

var _dataItem = require('./data-item');

var _dataItem2 = _interopRequireDefault(_dataItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataMockController = function () {
    function DataMockController() {
        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, DataMockController);

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


    DataMockController.prototype.addList = function addList() {
        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var self = this;

        list.forEach(function (item) {
            self.addOne(item);
        });
    };

    /**
     * 追加一个数据到仓库中
     * @param {String || Number || Object} value
     * @param {Array} [tags] 标签数组
     */


    DataMockController.prototype.addOne = function addOne(value) {
        var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        var newDataItem = new _dataItem2.default(value, tags);

        // 如果已经存在，则不再新增，而是更新之
        var filterResult = this.store.filter(function (item) {
            return item.isMe(newDataItem.value);
        });

        if (filterResult.length) {
            var existDataItem = filterResult[0];
            console.log('exist, new', existDataItem, newDataItem);
            Object.assign(existDataItem, newDataItem);
            return;
        }

        this.store.push(newDataItem);
    };

    /**
     * 获得随机一个值
     */


    DataMockController.prototype.getRandom = function getRandom() {
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
            var randomIndex = parseInt(Math.random() * this.store.length + '');

            // 如果该随机数未被使用，则停止
            if (this._cachedRandomQueue.indexOf(randomIndex) < 0) {
                this._cachedRandomQueue.push(randomIndex);
                break;
            }
        }

        // 因为新生成的随机数一定是在队列的最后，所以直接取最后一个值即可
        return this.store[this._cachedRandomQueue[this._cachedRandomQueue.length - 1]].getData();
    };

    /**
     * 通过指定的 tag 找到对应的数据
     * @param {String | Array} tags
     * @param {Boolean} [isStrict] 是否是严格模式，该模式下需要同时满足要求
     * @return {Array}
     */


    DataMockController.prototype.getDataByTag = function getDataByTag(tags, isStrict) {
        if (!Array.isArray(tags)) {
            tags = [tags];
        }

        var filterResult = this.store.filter(function (item) {
            return item.isMyTag(tags, isStrict);
        });

        return filterResult;
    };

    return DataMockController;
}();

exports.default = DataMockController;