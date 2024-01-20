import _ from 'lodash';

const stylish = (diffData) => {
  const symbol = ' ';
  const plus = '+ ';
  const minus = '- ';
  const iter = (node, depth) => {
    const newData = node.map((item) => {
      const tab = symbol.repeat(depth * 4 - 2);
      const tab1 = symbol.repeat(depth * 4);
      if (!_.isArray(item.value)) {
        if (!Object.hasOwn(item, 'status')) {
          return `${tab1}${item.key}: ${item.value}`;
        }
        switch (item.status) {
          case 'unchanged':
            return `${tab1}${item.key}: ${item.value}`;
          case 'added':
            return `${tab}${plus}${item.key}: ${item.value}`;
          case 'updated':
            return `${tab}${minus}${item.key}: ${item.value}\n${tab}${plus}${item.key}: ${item.newValue}`;
          case 'deleted':
            if (!_.isArray(item.value)) {
              return `${tab}${minus}${item.key}: ${item.value}`;
            }
            break;
          default:
            throw new Error('Unknown status');
        }
      }
      if (!Object.hasOwn(item, 'status')) {
        return `${tab1}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
      }
      switch (item.status) {
        case 'updated':
          if (!_.isArray(item.newValue)) {
            return `${tab}${minus}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}\n${tab}${plus}${item.key}: ${item.newValue}`;
          }
          return `${tab}${minus}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}${tab}${plus}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
        case 'unchanged':
          return `${tab1}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
        case 'added':
          return `${tab}${plus}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
        case 'deleted':
          return `${tab}${minus}${item.key}: {\n${iter(item.value, depth + 1)}\n${tab1}}`;
        default:
          throw new Error('Unknown status');
      }
    });
    return newData.join('\n');
  };
  return `{\n${iter(diffData, 1)}\n}`;
};

export default stylish;