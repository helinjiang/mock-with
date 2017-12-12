export default class DataItem {
    constructor(data, id, tags) {
        if (this._isMatchFormat(data)) {
            /**
             * 值，建议使用原始数据类型的值，比如字符串或者数字
             */
            this.data = data.data;

            /**
             * 唯一标识，可以不填，自动生成，但是如果要更新，则必须填写
             * @type {String}
             */
            this.id = this._generateId(data.id);

            /**
             * 标签数组，用于过滤
             * @type {Array}
             */
            this.tags =  this._generateTags(data.tags);
        } else {
            /**
             * 值，建议使用原始数据类型的值，比如字符串或者数字
             */
            this.data = data;

            /**
             * 唯一标识，可以不填，自动生成，但是如果要更新，则必须填写
             * @type {String}
             */
            this.id = this._generateId(id);

            /**
             * 标签数组，用于过滤
             * @type {Array}
             */
            this.tags = this._generateTags(tags);
        }
    }

    isMe(id){
        return this.id === id;
    }

    _isMatchFormat(data) {
        return data && data.id;
    }

    _generateId(id) {
        return id || 'id_' + Date.now() + Math.random();
    }

    _generateTags(tags) {
        return (Array.isArray(tags) ? tags : []);
    }
}

