import { expect } from 'chai';
import DataMockController, { DataItem } from '../src';

describe('测试 index.js', function () {

    it('DataMockController 属性存在', function () {
        expect(DataMockController).to.be.an('function');
    });

    it('DataItem 属性存在', function () {
        expect(DataItem).to.be.an('function');
    });

});
