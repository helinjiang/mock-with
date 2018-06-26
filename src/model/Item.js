const { expect } = require('chai');

module.exports = class {
    /**
     * 每一个 Item 都有一个值(value)，以及数个标签(tags)
     *
     * @param {{value:*,tags:Array} | *} value 对象或者其他元素
     * @param {Array} [tags] 标签列表
     */
    constructor(value, tags) {
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

    isMe(value) {
        try {
            expect(value).to.eql(this.value);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 判断目标标签集合是否包含在标签集合中
     *
     * @param {Array} tags 标签集合
     * @param {Boolean} isStrict 是否严格相等
     * @returns {boolean}
     */
    isMyTag(tags = [], isStrict) {
        let filterResult = tags.filter((tag) => {
            return this.tags.indexOf(tag) > -1;
        });

        if (!filterResult.length) {
            return false;
        }

        if (!isStrict) {
            return true;
        }

        return tags.length === filterResult.length;
    }

    /**
     * 获取内容
     * @returns {value}
     */
    getData() {
        return this.value;
    }

    _isMatchFormat(data) {
        return data && data.value;
    }

    _generateTags(tags) {
        if (Array.isArray(tags)) {
            return tags;
        }

        return (typeof tags !== 'undefined') ? [tags] : [];
    }
};

