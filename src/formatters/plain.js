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
  const iter = (node, currentKey) => {
    const res = node.map(({
      key,
      value,
      newValue,
      status,
    }) => {
      switch (status) {
        case 'nested':
          return iter(value, `${currentKey}${key}.`);
        case 'added':
          return `Property '${currentKey}${key}' was added with value: ${convertToString(value)}\n`;
        case 'deleted':
          return `Property '${currentKey}${key}' was removed\n`;
        case 'updated':
          return `Property '${currentKey}${key}' was updated. From ${convertToString(value)} to ${convertToString(newValue)}\n`;
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
