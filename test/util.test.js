const { expect } = require('chai');

const { util } = require('../lib');

describe('测试 util.js', function () {
    describe('基础检查', function () {
        it('should contain some fields', () => {
            expect(util).to.have.all.keys('getRandomIndex', 'getOneOf');
        });
    });

    describe('检查 getRandomIndex(list)', function () {
        it('list 为 undefined 时，返回0', () => {
            expect(util.getRandomIndex()).to.equal(0);
        });

        it('list 为空时，返回0', () => {
            let list = [];
            expect(util.getRandomIndex(list)).to.equal(0);
        });

        it('list 有5个元素时，返回0-4', () => {
            let list = ['a', 'b', 'c', 'd', 'e'];
            expect(util.getRandomIndex(list)).to.be.within(0, 4);
        });
    });

    describe('检查 getOneOf(list)', function () {
        it('list 为 undefined 时，返回0', () => {
            expect(util.getOneOf()).to.be.undefined;
        });

        it('list 为空时，返回0', () => {
            let list = [];
            expect(util.getOneOf(list)).to.be.undefined;
        });

        it('list 有5个元素时，返回0-4', () => {
            let list = ['a', 'b', 'c', 'd', 'e'];
            expect(util.getOneOf(list)).to.be.oneOf(list);
        });
    });

});
