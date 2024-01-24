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
    const result = node.map(({
      key,
      value,
      newValue,
      status,
    }) => {
      switch (status) {
        case 'nested':
          return `${replacer}  ${key}: {\n${iter(value, depth + 1)}\n${replacer}  }`;
        case 'deleted':
          return `${replacer}${minus}${key}: ${convertToString(value, depth)}`;
        case 'added':
          return `${replacer}${plus}${key}: ${convertToString(value, depth)}`;
        case 'updated': {
          const oldValue = convertToString(value, depth);
          const updatedValue = convertToString(newValue, depth);
          return `${replacer}${minus}${key}: ${oldValue}\n${replacer}${plus}${key}: ${updatedValue}`;
        }
        case 'unchanged':
          return `${replacer}  ${key}: ${convertToString(value, depth)}`;
        default:
          throw new Error('Unknown status');
      }
    });
    return result.join('\n');
  };

  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
