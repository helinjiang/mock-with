import { expect } from 'chai';
import DataMockController from '../src/data-mock-controller';

describe('测试 data-mock-controller.js', function () {
    describe('常规验证', function () {
        it('DataMockController 属性存在', function () {
            expect(DataMockController).to.be.an('function');
        });
    });

    describe('参数list为普通数组', function () {
        let dataMockController = new DataMockController(['a', 'b', 'c', 'd']);

        console.log(JSON.stringify(dataMockController.store));

        it('dataMockController.store 有四个元素', function () {
            expect(dataMockController.store).to.have.lengthOf(4);
        });

        it('dataMockController.getRandom() 随机返回一个list中的值', function () {
            expect(dataMockController.getRandom()).to.be.oneOf(['a', 'b', 'c', 'd']);
        });
    });

});

