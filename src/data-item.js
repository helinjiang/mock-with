import { expect } from 'chai';

export default class DataItem {
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
}

