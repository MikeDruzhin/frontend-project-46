import _ from 'lodash';

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
    const convert = (obj) => {
      const dataKeys = Object.keys(obj);
      const result = dataKeys.reduce((resArr, key1) => {
        if (!_.isObject(obj[key1])) {
          resArr.push({ key: key1, value: obj[key1] });
          return resArr;
        }
        resArr.push({ key: key1, value: convert(obj[key1]) });
        return resArr;
      }, []);
      return result;
    };
    const tmp = { key, value: _.isObject(data1[key]) ? convert(data1[key]) : data1[key] };
    const tmp1 = { key, value: _.isObject(data2[key]) ? convert(data2[key]) : data2[key] };
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
        tmp.status = 'updated';
        tmp.newValue = _.isObject(data2[key]) ? convert(data2[key]) : data2[key];
        acc.push(tmp);
      }
    }
    return acc;
  }, []);
  return res;
};

export default buildDiffTree;
