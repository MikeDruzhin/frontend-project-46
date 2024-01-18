import _ from 'lodash';

const plain = (diffData) => {
  const res = diffData.flatMap((item) => {
    const key = item.key;
    if (!_.isArray(item.value)) {
      if (!Object.hasOwn(item, 'status')) {
        return `${key} was added with value: [complex value]`;
      }
      switch (item.status) {
        case 'unchanged':
          return ``;
        case 'added':
          return `${key} was added with value: ${item.value}`;
        case 'deleted':
          return `${key} was removed`;
        default:
          return `${key} was updated. From ${item.value} to ${item.newValue}`;
      }
    }
    switch (item.status) {
      case 'added':
        return `${key} was added with value: [complex value]`;
      case 'deleted':
        return `${key} was removed`;
    }
    const newValue = plain(item.value)
    const data = newValue.flatMap((item) => `${key}.${item}`);
    return data;
  });
  let newRes = [...res]
  newRes = res.flatMap((node) => `Property ${node}`)
  return newRes;
}

export default plain;