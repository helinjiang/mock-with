'use strict';

exports.__esModule = true;
exports.getRandomIndex = getRandomIndex;
exports.getOneOf = getOneOf;
function getRandomIndex() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return parseInt(Math.random() * list.length + '');
}

function getOneOf(list) {
    return list[getRandomIndex(list)];
}