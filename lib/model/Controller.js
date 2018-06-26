'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = require('./Item');

var _require = require('../util'),
    getOneOf = _require.getOneOf,
    getRandomIndex = _require.getRandomIndex;

module.exports = function () {
    function Controller() {
        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Controller);

        /**
         * 存储的数据结构为 [{Item},{Item}]
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


    _createClass(Controller, [{
        key: 'addList',
        value: function addList() {
            var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var self = this;

            list.forEach(function (item) {
                self.addOne(item);
            });
        }

        /**
         * 追加一个数据到仓库中
         * @param {String || Number || Object} value
         * @param {Array} [tags] 标签数组
         */

    }, {
        key: 'addOne',
        value: function addOne(value) {
            var tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var newItem = value instanceof Item ? value : new Item(value, tags);

            // 如果已经存在，则不再新增，而是更新之
            var filterResult = this.store.filter(function (item) {
                return item.isMe(newItem.value);
            });

            // 如果已经存在，则更新数据
            if (filterResult.length) {
                var existItem = filterResult[0];
                // console.log('exist, new', existItem, newItem);
                Object.assign(existItem, newItem);
                return;
            }

            this.store.push(newItem);
        }

        /**
         * 获得随机一个值
         */

    }, {
        key: 'getRandom',
        value: function getRandom() {
            // 如果没有任何初始数据，则抛出异常
            if (!this.store.length) {
                throw new Error('no list!');
            }

            // 如果缓存已满，则清空
            if (this._cachedRandomQueue.length >= this.store.length) {
                this._cachedRandomQueue = [];
            }

            var safety = 0;

            // 找到目标的随机数
            while (true) {
                safety++;

                // 首先生成随机一个数
                var randomIndex = getRandomIndex(this.store);

                // 如果该随机数未被使用，则停止
                if (this._cachedRandomQueue.indexOf(randomIndex) < 0) {
                    this._cachedRandomQueue.push(randomIndex);
                    break;
                }

                // 最多循环 1万次，避免陷入死循环
                if (safety > 10 * 1000) {
                    break;
                }
            }

            // 因为新生成的随机数一定是在队列的最后，所以直接取最后一个值即可
            return this.store[this._cachedRandomQueue[this._cachedRandomQueue.length - 1]].getData();
        }

        /**
         * 通过指定的 tag 找到对应的数据
         * @param {String | Array} tags
         * @param {Boolean} [shouldSubset] 是否要求是子集
         * @return {*}
         */

    }, {
        key: 'getByTag',
        value: function getByTag(tags, shouldSubset) {
            if (!Array.isArray(tags)) {
                tags = [tags];
            }

            var filterResult = this.store.filter(function (item) {
                return item.isMyTag(tags, shouldSubset);
            });

            if (!filterResult.length) {
                return;
            }

            return getOneOf(filterResult).getData();
        }
    }]);

    return Controller;
}();