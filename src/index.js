import getParsedData from '../parser.js';
import buildDiffTree from '../buildTree.js';
import stylish from '../stylish.js';

const gendiff = (filepath1, filepath2) => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  const res = stylish(diffTree);
  return res;
};

export default gendiff;
