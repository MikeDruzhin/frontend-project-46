import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  const nodes = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: buildDiffTree(data1[key], data2[key]), status: 'nested' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], status: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], status: 'deleted' };
    }
    if (data1[key] !== data2[key]) {
      return {
        key,
        value: data1[key],
        newValue: data2[key],
        status: 'updated',
      };
    }
    return { key, value: data1[key], status: 'unchanged' };
  });
  return nodes;
};

export default buildDiffTree;
