import yaml from 'js-yaml';
import fs from 'fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';

const getParsedData = (file) => {
  let filepath;
  if (file.includes(path.resolve(`${cwd()}`, '__fixtures__'))) {
    filepath = file;
  }
  filepath = path.resolve(`${cwd()}`, '__fixtures__', `${file}`);
  const data = fs.readFileSync(filepath, 'utf-8');
  const format = path.extname(filepath);
  switch (format) {
    case '.json':
      return JSON.parse(data);
    default:
      return _.pick(yaml.load(data), Object.keys(yaml.load(data)).sort());
  }
};

export default getParsedData;
