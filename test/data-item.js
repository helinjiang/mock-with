import { expect } from 'chai';
import DataItem from '../src/data-item';

describe('测试 data-item.js', function () {
    describe('常规验证', function () {
        it('DataItem 属性存在', function () {
            expect(DataItem).to.be.an('function');
        });
    });

    describe('传参仅 value', function () {
        let dataItem = new DataItem('a');

        it('dataItem 有两个属性', function () {
            expect(dataItem).to.have.all.keys(['value', 'tags']);
        });

        it('dataItem.value="a"', function () {
            expect(dataItem.value).to.equal('a');
        });

        it('dataItem.tags 为空数组', function () {
            expect(dataItem.tags).to.be.an('array').that.is.empty;
        });
    });

    describe('传参 data 和 tags', function () {
        let dataItem = new DataItem('a', ['t', 'f', 'boys']);

        it('dataItem 有两个属性', function () {
            expect(dataItem).to.have.all.keys(['value', 'tags']);
        });

        it('dataItem.tags 为预期值', function () {
            expect(dataItem.tags).to.members(['t', 'f', 'boys']);
        });
    });

    describe('校验 isMe()', function () {
        it('对比原始数据类型时，符合则返回true', function () {
            let dataItem = new DataItem('a');
            expect(dataItem.isMe('a')).to.be.true;
        });

        it('对比原始数据类型时，不符合则返回false', function () {
            let dataItem = new DataItem('a');
            expect(dataItem.isMe('aa')).to.be.false;
        });

        it('对比对象类型时，符合则返回true', function () {
            let dataItem = new DataItem({ a: 1 });
            expect(dataItem.isMe({ a: 1 })).to.be.true;
        });

        it('对比对象类型时，字段名相同，值不同，返回false', function () {
            let dataItem = new DataItem({ a: 1 });
            expect(dataItem.isMe({ a: 2 })).to.be.false;
        });

        it('对比对象类型时，字段名不同，值相同，返回false', function () {
            let dataItem = new DataItem({ a: 1 });
            expect(dataItem.isMe({ aa: 1 })).to.be.false;
        });

        it('对比对象类型时，只有部分属性相同，返回false', function () {
            let dataItem = new DataItem({ a: 1 });
            expect(dataItem.isMe({ a: 1, b: 2 })).to.be.false;
        });

    });
});

