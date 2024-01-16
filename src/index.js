import _ from 'lodash';
import getParsedData from '../parser.js';
import buildDiffTree from '../buildTree.js';

const gendiff = (filepath1, filepath2) => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  // Функция для получения результирующего формата вывода
  const formatter = (diffData) => {
    const tab = '   ';
    const plus = ' + ';
    const minus = ' - ';
    const iter = (node, depth) => {
      const newData = node.map((item) => {
        const tab0 = tab.repeat(depth);
        const tab1 = tab.repeat(depth + 1);
        if (!_.isArray(item.value)) {
          if (!Object.hasOwn(item, 'status')) {
            return `${tab}${tab1}${item.key}: ${item.value}`;
          }
          switch (item.status) {
            case 'unchanged':
              if (depth === 0) {
                return `${tab}${tab0}${item.key}: ${item.value}`;
              }
              return `${tab}${tab1}${item.key}: ${item.value}`;
            case 'added':
              if (depth === 0) {
                return `${tab0}${plus}${item.key}: ${item.value}`;
              }
              return `${tab1}${plus}${item.key}: ${item.value}`;
            default:
              if (depth === 0) {
                return `${tab0}${minus}${item.key}: ${item.value}`;
              }
              return `${tab1}${minus}${item.key}: ${item.value}`;
          }
        }
        switch (item.status) {
          case 'unchanged':
            return `${tab}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
          case 'added':
            return `${plus}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
          default:
            return `${minus}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
        }
      });
      return newData.join('\n');
    };
    return `{\n${iter(diffData, 0)}\n}`;
  };
  return formatter(diffTree);
};

export default gendiff;
