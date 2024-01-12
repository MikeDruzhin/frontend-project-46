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
        /*if (node.status === 'unchanged') {
          return ` ${node.key} : ${formatter(node.value)}`
        } else if (node.status === 'added') {
          return `+ ${node.key} : ${formatter(node.value)}`
        }*/
        return `${node.status === 'changed' ? '+' : '-'} ${node.key} : ${formatter(node.value)}`
      }
      return `${node.status === 'changed' ? '+' : '-'} ${node.key} : ${node.value}`
    })
    return res;  
  }

  return formatter(diffTree)//JSON.stringify(getRes(data1, data2), null, '  ').replaceAll('"', '').replaceAll(',', '');
};

export default gendiff;
