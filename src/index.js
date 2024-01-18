import getParsedData from '../parser.js';
import buildDiffTree from '../buildTree.js';
import stylish from '../stylish.js';
import plain from '../plain.js';

const gendiff = (filepath1, filepath2) => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  const res = plain(diffTree);
  return res;
};

export default gendiff;

const f1 = 'file1.json';
const f2 = 'file2.json';
console.log(gendiff(f1, f2));