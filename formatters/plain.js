import _ from 'lodash';

const plain = (diffData) => {
  const iter = (node, key) => {
    const res = node.flatMap((item) => {
      const condition = (key === '') ? '' : '.';
      const quotes = (typeof item.value === 'string' || typeof item.newValue === 'string') ? "'" : '';
      const currentKey = `${key}${condition}${item.key}`;
      if (!_.isArray(item.value)) {
        if (!Object.hasOwn(item, 'status')) {
          return `Property '${currentKey}' was added with value: [complex value]`;
        }
        switch (item.status) {
          case 'unchanged':
            return '';
          case 'added':
            return `Property '${currentKey}' was added with value: ${quotes}${item.value}${quotes}`;
          case 'deleted':
            return `Property '${currentKey}' was removed`;
          default:
            return `Property '${currentKey}' was updated. From ${quotes}${item.value}${quotes} to ${quotes}${item.newValue}${quotes}`;
        }
      }
      const newValue = iter(item.value, currentKey);
      const data = newValue.flatMap((str) => str);
      switch (item.status) {
        case 'updated':
          if (!_.isArray(item.newValue)) {
            return `Property '${currentKey}' was updated. From [complex value] to ${quotes}${item.newValue}${quotes}`;
          }
          break;
        case 'added':
          return `Property '${currentKey}' was added with value: [complex value]`;
        case 'deleted':
          return `Property '${currentKey}' was removed`;
        default:
          break;
      }
      return data;
    });
    return res;
  };
  return iter(diffData, '').filter((str) => str !== '').join('\n');
};

export default plain;
