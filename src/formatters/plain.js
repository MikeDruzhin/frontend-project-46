import _ from 'lodash';

const convertToString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const plain = (diffData) => {
  const iter = (node, key) => {
    const res = node.map((item) => {
      switch (item.status) {
        case 'nested':
          return iter(item.value, `${key}${item.key}.`);
        case 'added':
          return `Property '${key}${item.key}' was added with value: ${convertToString(item.value)}\n`;
        case 'deleted':
          return `Property '${key}${item.key}' was removed\n`;
        case 'updated':
          return `Property '${key}${item.key}' was updated. From ${convertToString(item.value)} to ${convertToString(item.newValue)}\n`;
        case 'unchanged':
          return null;
        default:
          throw new Error('Unknown status');
      }
    });
    return `${res.join('')}`;
  };
  return iter(diffData, '').trim();
};

export default plain;
