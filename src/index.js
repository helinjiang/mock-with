import DataMockController from './data-mock-controller';
import DataItem from './data-item';
import { getRandomIndex, getOneOf } from './tools';

DataMockController.DataItem = DataItem;
DataMockController.getRandomIndex = getRandomIndex;
DataMockController.getOneOf = getOneOf;

module.exports = DataMockController;
