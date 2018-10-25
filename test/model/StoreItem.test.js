const { expect } = require('chai');

const { Item } = require('../../lib');

describe('测试 model/Item.js', function () {
    describe('常规验证', function () {
        it('Item 属性存在', function () {
            expect(Item).to.be.an('function');
        });
    });

    describe('传参仅 value', function () {
        let item = new Item('a');

        it('item 有两个属性', function () {
            expect(item).to.have.all.keys(['value', 'tags']);
        });

        it('item.value="a"', function () {
            expect(item.value).to.equal('a');
        });

        it('item.getData', function () {
            expect(item.getData()).to.equal('a');
        });

        it('item.tags 为空数组', function () {
            expect(item.tags).to.be.an('array').that.is.empty;
        });
    });

    describe('传参 value 和 tags', function () {
        let item = new Item('a', ['t', 'f', 'boys']);

        it('item 有两个属性', function () {
            expect(item).to.have.all.keys(['value', 'tags']);
        });

        it('item.value="a"', function () {
            expect(item.value).to.equal('a');
        });

        it('item.getData', function () {
            expect(item.getData()).to.equal('a');
        });

        it('item.tags 为预期值', function () {
            expect(item.tags).to.members(['t', 'f', 'boys']);
        });
    });

    describe('校验 isMe(value)', function () {
        it('对比原始数据类型时，符合则返回true', function () {
            let item = new Item('a');
            expect(item.isMe('a')).to.be.true;
        });

        it('对比原始数据类型时，不符合则返回false', function () {
            let item = new Item('a');
            expect(item.isMe('aa')).to.be.false;
        });

        it('对比对象类型时，符合则返回true', function () {
            let item = new Item({ a: 1 });
            expect(item.isMe({ a: 1 })).to.be.true;
        });

        it('对比对象类型时，字段名相同，值不同，返回false', function () {
            let item = new Item({ a: 1 });
            expect(item.isMe({ a: 2 })).to.be.false;
        });

        it('对比对象类型时，字段名不同，值相同，返回false', function () {
            let item = new Item({ a: 1 });
            expect(item.isMe({ aa: 1 })).to.be.false;
        });

        it('对比对象类型时，只有部分属性相同，返回false', function () {
            let item = new Item({ a: 1 });
            expect(item.isMe({ a: 1, b: 2 })).to.be.false;
        });
    });

    describe('校验 isMyTag(tags, shouldSubset)', function () {
        let item;

        before(function () {
            item = new Item('a', ['t', 'f', 'boys']);
        });

        it('tags 为字符串', function () {
            expect(item.isMyTag('t')).to.be.true;
            expect(item.isMyTag('a')).to.be.false;
        });

        it('tags 为 undefined', function () {
            expect(item.isMyTag()).to.be.false;
        });

        it('tags 为空数组', function () {
            expect(item.isMyTag([])).to.be.false;
        });

        it('tags 为数组，且是子集', function () {
            expect(item.isMyTag(['t', 'f'])).to.be.true;
        });

        it('tags 为数组，且是子集，且shouldSubset=true', function () {
            expect(item.isMyTag(['t', 'f'], true)).to.be.true;
        });

        it('tags 为数组，且有交集', function () {
            expect(item.isMyTag(['t', 'a'])).to.be.true;
        });

        it('tags 为数组，且有交集，且shouldSubset=true', function () {
            expect(item.isMyTag(['t', 'a'], true)).to.be.false;
        });

        it('tags 为数组，且为全集', function () {
            expect(item.isMyTag(['t', 'f', 'boys'])).to.be.true;
        });

        it('tags 为数组，且为全集，且shouldSubset=true', function () {
            expect(item.isMyTag(['t', 'f', 'boys'], true)).to.be.true;
        });
    });
});

