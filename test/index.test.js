const { expect } = require('chai');

const mockWith = require('../lib');

describe('测试 index.js', function () {
    it('Controller 属性存在', function () {
        expect(mockWith.Controller).to.be.an('function');
    });

    it('Item 属性存在', function () {
        expect(mockWith.Item).to.be.an('function');
    });
});
