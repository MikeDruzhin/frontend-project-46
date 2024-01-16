import _ from 'lodash';
import getParsedData from './parser.js';
const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  const res = keys.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const tmp = { key, value: buildDiffTree(data1[key], data2[key]) };
      tmp.status = 'unchanged';
      acc.push(tmp);
      return acc;
    }
    
    const tmp = { key, value: data1[key] };
    const tmp1 = { key, value: data2[key] };
    if (!Object.hasOwn(data1, key)) {
      tmp1.status = 'added';
      acc.push(tmp1);
    } else if (!Object.hasOwn(data2, key)) {
      tmp.status = 'deleted';
      acc.push(tmp);
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        tmp1.status = 'unchanged';
        acc.push(tmp1);
      } else {
        tmp.status = 'deleted';
        tmp1.status = 'added';
        acc.push(tmp);
        acc.push(tmp1);
      }
    }
    return acc;
  }, []);
  return res;
};

const file1 = getParsedData('file1.json');
const file2 = getParsedData('file2.json');
console.log(JSON.stringify(buildDiffTree(file1, file2), null, ' '));
export default buildDiffTree;
