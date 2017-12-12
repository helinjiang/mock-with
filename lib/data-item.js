'use strict';

exports.__esModule = true;

var _chai = require('chai');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataItem = function () {
    function DataItem(value, tags) {
        _classCallCheck(this, DataItem);

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

    DataItem.prototype.isMe = function isMe(value) {
        try {
            (0, _chai.expect)(value).to.eql(this.value);
            return true;
        } catch (e) {
            return false;
        }
    };

    DataItem.prototype.isMyTag = function isMyTag() {
        var _this = this;

        var tags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var isStrict = arguments[1];

        var filterResult = tags.filter(function (tag) {
            return _this.tags.indexOf(tag) > -1;
        });

        if (!filterResult.length) {
            return false;
        }

        if (!isStrict) {
            return true;
        }

        return tags.length === filterResult.length;
    };

    DataItem.prototype.getData = function getData() {
        return this.value;
    };

    DataItem.prototype._isMatchFormat = function _isMatchFormat(data) {
        return data && data.value;
    };

    DataItem.prototype._generateTags = function _generateTags(tags) {
        if (Array.isArray(tags)) {
            return tags;
        }

        return typeof tags !== 'undefined' ? [tags] : [];
    };

    return DataItem;
}();

exports.default = DataItem;