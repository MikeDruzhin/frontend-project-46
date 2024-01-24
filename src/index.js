import fs from 'fs';
import path from 'node:path';
import getParsedData from './parser.js';
import buildDiffTree from './buildTree.js';
import getSelectedFormat from './formatters/formatSelector.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return getParsedData(fs.readFileSync(absolutePath, 'utf-8'), getFormat(filepath));
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  const res = getSelectedFormat(diffTree, formatName);
  return res;
};

export default gendiff;
