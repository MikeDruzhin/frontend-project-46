import { readFileSync } from 'fs';
import _ from 'lodash';

const parser = (file) => {
  const data = readFileSync(file, 'utf-8');
  const parseData = JSON.parse(data);
  return _.pick(parseData, Object.keys(parseData).sort());
};

export default parser;
