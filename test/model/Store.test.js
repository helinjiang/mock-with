const { expect } = require('chai');

const { Controller, Item } = require('../../lib');

describe('测试 model/Controller.js', function () {
    describe('常规验证', function () {
        it('Controller 属性存在', function () {
            expect(Controller).to.be.an('function');
        });
    });

    describe('参数list为普通数组', function () {
        let arr=['a', 'b', 'c', 'd'];
        let controller = new Controller(arr);

        it('controller.store 有四个元素', function () {
            expect(controller.store).to.have.lengthOf(4);
        });

        it('controller.getRandom() 随机返回一个list中的值', function () {
            expect(controller.getRandom()).to.be.oneOf(arr);
        });

        it('controller.getOne() 随机返回一个list中的值', function () {
            expect(controller.getOne()).to.be.oneOf(arr);
        });

        it('controller.getSome(2) 随机返回一个数组，包含两个元素', function () {
            expect(arr).to.include.members(controller.getSome(2));
        });
    });

    describe('验证 addOne', function () {
        let controller;

        beforeEach(function () {
            controller = new Controller(['a', 'b']);
        });

        it('controller.addOne("a") 重复', function () {
            controller.addOne('a');
            expect(controller.store).to.have.lengthOf(2);
        });

        it('controller.addOne("c") 不重复', function () {
            controller.addOne('c');
            expect(controller.store).to.have.lengthOf(3);
        });

        it('controller.addOne(Item) 重复', function () {
            controller.addOne({
                value: 'a'
            });

            expect(controller.store).to.have.lengthOf(2);
        });

        it('controller.addOne(Item) 不重复', function () {
            controller.addOne({
                data: 'DATAITEM',
                id: 'ID',
                tags: ['TAGS']
            });

            expect(controller.store).to.have.lengthOf(3);
        });

        it('controller.addOne(Item) 重复，Item对象', function () {
            controller.addOne(new Item('a', ['TAGS']));

            expect(controller.store).to.have.lengthOf(2);
        });

        it('controller.addOne(Item) 不重复，Item对象', function () {
            controller.addOne(new Item('other', ['TAGS']));

            expect(controller.store).to.have.lengthOf(3);
        });
    });

    describe('验证 addList', function () {
        let controller;

        beforeEach(function () {
            controller = new Controller(['a', 'b', new Item('other', ['TAGS'])]);
        });

        it('controller.addList(["a","c"])', function () {
            controller.addList(['a', 'c']);
            expect(controller.store).to.have.lengthOf(4);
        });
    });

    describe('验证 getByTag', function () {
        let controller;

        before(function () {
            controller = new Controller(['a', 'b']);
            controller.addOne('c', ['t', 'f', 'boys']);
            controller.addOne('d', ['o', 'f']);
            controller.addOne('e', ['o', 'f']);
        });

        it('查不到标签为a的数据', function () {
            let result = controller.getByTag('a');
            expect(result).to.be.undefined;
        });

        it('标签为t的数据有一个', function () {
            let result = controller.getByTag('t');
            expect(result).to.equal('c');
        });

        it('标签为f的数据有三个', function () {
            let result = controller.getByTag('f');
            expect(result).to.be.oneOf(['c', 'd', 'e']);
        });

        it('标签为o或f的数据有三个', function () {
            let result = controller.getByTag(['o', 'f']);
            expect(result).to.be.oneOf(['c', 'd', 'e']);
        });

        it('标签为o且f的数据有两个', function () {
            let result = controller.getByTag(['o', 'f'], true);
            expect(result).to.be.oneOf(['d', 'e']);
        });
    });

});

