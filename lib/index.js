'use strict';

var _dataMockController = require('./data-mock-controller');

var _dataMockController2 = _interopRequireDefault(_dataMockController);

var _dataItem = require('./data-item');

var _dataItem2 = _interopRequireDefault(_dataItem);

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dataMockController2.default.DataItem = _dataItem2.default;
_dataMockController2.default.getRandomIndex = _tools.getRandomIndex;
_dataMockController2.default.getOneOf = _tools.getOneOf;

module.exports = _dataMockController2.default;