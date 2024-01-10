//import gendiff from '../bin/gendiff.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import gendiff from '../index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('first', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(readFile('expected.json').replaceAll('"', '').replaceAll(',', ''));
});