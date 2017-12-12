import { expect } from 'chai';
import { DataMockController } from '../src';

describe('测试 index.js', function () {

    it('DataMockController 属性存在', function () {
        expect(DataMockController).to.be.an('function');
    });

});
