import _ from 'lodash';
import getParsedData from '../parser.js';
import buildDiffTree from '../buildTree.js';

const gendiff = (filepath1, filepath2) => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  // Функция для получение результирующего формата вывода
  const formatter = (diffTree) => {
    const res = diffTree.map((node) => {
      if (_.isArray(node.value)) {
        if (node.status === 'unchanged') {
          return `  ${node.key}: {\n${formatter(node.value)}  }`
        } else if (node.status === 'added') {
          return `+ ${node.key}: {\n${formatter(node.value)}  }`
        } else {
          return `- ${node.key}: {\n${formatter(node.value)}  }`
        } 
      }
      if (!Object.hasOwn(node, 'status')) {
        return `        ${node.key}: ${node.value}\n`;
      }
      if (node.status === 'unchanged') {
        return `        ${node.key}: ${node.value}\n`;
      } else if (node.status === 'added') {
        return `      + ${node.key}: ${node.value}\n`;
      } else {
        return `      - ${node.key}: ${node.value}\n`;
      }
    });
    return res;  
  }
  const result = JSON.stringify(formatter(diffTree), null, '  ').replaceAll('"', '').replaceAll(',', '');//replace(',', '\n')
  return formatter(diffTree).join('\n').replaceAll(',', '')
};

const filepath1 = 'filepath1.yml';
const filepath2 = 'filepath2.yml';
console.log(gendiff(filepath1, filepath2))

export default gendiff;
