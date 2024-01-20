import getParsedData from '../parser.js';
import buildDiffTree from '../buildTree.js';
import formatSelector from '../formatters/formatSelector.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  const res = formatSelector(diffTree, formatName);
  return res;
};

export default gendiff;
