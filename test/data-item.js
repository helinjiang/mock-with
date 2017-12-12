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
});

