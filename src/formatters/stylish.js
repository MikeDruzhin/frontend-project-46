import _ from 'lodash';

const symbol = ' ';
const plus = '+ ';
const minus = '- ';
const spacesPerLevel = 4;
const leftShift = 2;

const convertToString = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const tab = symbol.repeat(spacesPerLevel);
  const replacer = symbol.repeat(spacesPerLevel * depth);
  const result = Object.keys(value).map((key) => {
    const nestedValue = convertToString(value[key], depth + 1);
    return `${replacer}${tab}${key}: ${nestedValue}`;
  });

  return `{\n${result.join('\n')}\n${replacer}}`;
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = symbol.repeat(spacesPerLevel * depth - leftShift);
    const result = node.map((item) => {
      switch (item.status) {
        case 'nested':
          return `${replacer}  ${item.key}: {\n${iter(item.value, depth + 1)}\n${replacer}  }`;
        case 'deleted':
          return `${replacer}${minus}${item.key}: ${convertToString(item.value, depth)}`;
        case 'added':
          return `${replacer}${plus}${item.key}: ${convertToString(item.value, depth)}`;
        case 'updated':
          return `${replacer}${minus}${item.key}: ${convertToString(item.value, depth)}\n${replacer}${plus}${item.key}: ${convertToString(item.newValue, depth)}`;
        case 'unchanged':
          return `${replacer}  ${item.key}: ${convertToString(item.value, depth)}`;
        default:
          throw new Error('Unknown status');
      }
    });
    return result.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
