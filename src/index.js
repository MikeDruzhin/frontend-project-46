import getParsedData from '../parser.js';
import buildDiffTree from '../buildTree.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  if (formatName === 'stylish') {
    return stylish(diffTree);
  }
  return plain(diffTree);
};

export default gendiff;
