const { expect } = require('chai');

const mockWith = require('../lib');

describe('测试 index.js', function () {
    it('should contain some fields', () => {
        expect(mockWith).to.have.all.keys('Controller', 'Item', 'util');
    });

    it('Controller 属性存在', function () {
        expect(mockWith.Controller).to.be.an('function');
    });

    it('Item 属性存在', function () {
        expect(mockWith.Item).to.be.an('function');
    });
});
