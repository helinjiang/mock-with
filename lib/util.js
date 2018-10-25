'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomIndex = getRandomIndex;
exports.getOneOf = getOneOf;
/**
 * 获取一个列表中的随机索引
 *
 * @param {Array} list 数组
 * @returns {Number}
 */
function getRandomIndex() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return parseInt(Math.random() * list.length + '');
}

/**
 * 获取列表中的随机一个
 *
 * @param {Array} list 数组
 * @returns {*}
 */
function getOneOf() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  return list[getRandomIndex(list)];
}