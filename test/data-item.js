import { expect } from 'chai';
import DataItem from '../src/data-item';

describe('测试 data-item.js', function () {
    describe('常规验证', function () {
        it('DataItem 属性存在', function () {
            expect(DataItem).to.be.an('function');
        });
    });

    describe('传参仅 data', function () {
        let dataItem = new DataItem('a');
        console.log(dataItem);

        it('dataItem 有三个属性', function () {
            expect(dataItem).to.have.all.keys(['data', 'id', 'tags']);
        });

        it('dataItem.data="a"', function () {
            expect(dataItem.data).to.equal('a');
        });

        it('dataItem.id 自动生成', function () {
            expect(dataItem.id).to.match(/id_\d+\.\d+/);
        });

        it('dataItem.tags 为空数组', function () {
            expect(dataItem.tags).to.be.an('array').that.is.empty;
        });
    });
});

