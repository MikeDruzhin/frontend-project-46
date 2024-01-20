import stylish from './stylish.js';
import plain from './plain.js';

const formatSelector = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree, null, ' ');
    default:
      throw new Error('Unknown format');
  }
};

export default formatSelector;
