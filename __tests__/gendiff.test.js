import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.json').replaceAll('"', '').replaceAll(',', '');
const expectedStylishYml = readFile('expectedYML.yml');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJSON = readFile('expectedJSON.json');

test.each([
  [expectedStylish, 'file1.json', 'file2.json', 'stylish'],
  [expectedStylishYml, 'filepath1.yml', 'filepath2.yml', 'stylish'],
  [expectedPlain, 'file1.json', 'file2.json', 'plain'],
  [expectedJSON, 'file1.json', 'file2.json', 'json'],
])('format test %#', (expected, file1, file2, formatName) => {
  expect(gendiff(getFixturePath(file1), getFixturePath(file2), formatName)).toBe(expected);
});
