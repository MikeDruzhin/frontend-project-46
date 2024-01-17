import _ from 'lodash';
const convert = (obj) => {
  const keys = Object.keys(obj)
  const res = keys.reduce((acc, key) => {
    if (!_.isObject(obj[key])) {
      acc.push({key, value: obj[key]});
      return acc;
    }
    acc.push({key, value: convert(obj[key])});
    return acc;
  }, [])
  return res;
}

//const data = {"nested": { "count": 5 }};
//console.log(JSON.stringify(convert(data), null, ' '))