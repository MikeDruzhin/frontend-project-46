#!/usr/bin/env node
import { program } from 'commander';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';
import parser from '../readfiles.js';

const gendiff = (filepath1, filepath2) => {
  let data1;
  let data2;
  if (filepath1.includes(path.resolve(`${cwd()}`, 'fixtures'))) {
    data1 = parser(filepath1);
  }
  if (filepath2.includes(path.resolve(`${cwd()}`, 'fixtures'))) {
    data2 = parser(filepath2);
  }
  data1 = parser(path.resolve(`${cwd()}`, 'fixtures', `${filepath1}`));
  data2 = parser(path.resolve(`${cwd()}`, 'fixtures', `${filepath2}`));
  const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);
  const res = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        acc[`  ${key}`] = data1[key];
      } else {
        acc[`- ${key}`] = data1[key];
        acc[`+ ${key}`] = data2[key];
      }
    } else {
      acc[`+ ${key}`] = data2[key];
    }
    return acc;
  }, {});
  return JSON.stringify(res, null, ' ').replaceAll('"', '').replaceAll(',', '');
};

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });
program.parse();

export default gendiff;
