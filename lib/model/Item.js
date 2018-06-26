'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('chai'),
    expect = _require.expect;

module.exports = function () {
    /**
     * 每一个 Item 都有一个值(value)，以及数个标签(tags)
     *
     * @param {{value:*,tags:Array} | *} value 对象或者其他元素
     * @param {Array} [tags] 标签列表
     */
    function _class(value, tags) {
        _classCallCheck(this, _class);

        if (this._isMatchFormat(value)) {
            /**
             * 值，建议使用原始数据类型的值，比如字符串或者数字
             */
            this.value = value.value;

            /**
             * 标签数组，用于过滤
             * @type {Array}
             */
            this.tags = this._generateTags(value.tags);
        } else {
            /**
             * 值，建议使用原始数据类型的值，比如字符串或者数字
             */
            this.value = value;

            /**
             * 标签数组，用于过滤
             * @type {Array}
             */
            this.tags = this._generateTags(tags);
        }
    }

    _createClass(_class, [{
        key: 'isMe',
        value: function isMe(value) {
            try {
                expect(value).to.eql(this.value);
                return true;
            } catch (e) {
                return false;
            }
        }

        /**
         * 判断目标标签是否与自己的标签有交集，
         * 如果要求目标标签集合是自己标签的子集，则需要设置 shouldSubset=true
         *
         * @param {Array | String} tags 标签集合
         * @param {Boolean} [shouldSubset] 是否要求是子集
         * @returns {boolean}
         */

    }, {
        key: 'isMyTag',
        value: function isMyTag() {
            var _this = this;

            var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var shouldSubset = arguments[1];

            if (!Array.isArray(tags)) {
                tags = [tags];
            }

            var filterResult = tags.filter(function (tag) {
                return _this.tags.indexOf(tag) > -1;
            });

            if (!filterResult.length) {
                return false;
            }

            if (!shouldSubset) {
                return true;
            }

            return tags.length === filterResult.length;
        }

        /**
         * 获取内容
         * @returns {value}
         */

    }, {
        key: 'getData',
        value: function getData() {
            return this.value;
        }
    }, {
        key: '_isMatchFormat',
        value: function _isMatchFormat(data) {
            return data && data.value;
        }
    }, {
        key: '_generateTags',
        value: function _generateTags(tags) {
            if (Array.isArray(tags)) {
                return tags;
            }

            return typeof tags !== 'undefined' ? [tags] : [];
        }
    }]);

    return _class;
}();