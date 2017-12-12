'use strict';

var _dataMockController = require('./data-mock-controller');

var _dataMockController2 = _interopRequireDefault(_dataMockController);

var _dataItem = require('./data-item');

var _dataItem2 = _interopRequireDefault(_dataItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dataMockController2.default.DataItem = _dataItem2.default;

module.exports = _dataMockController2.default;