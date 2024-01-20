/* eslint no-underscore-dangle: 0 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('Stylish format test 1', () => {
  expect(gendiff('file1.json', 'file2.json', 'stylish')).toEqual(readFile('expected.json').replaceAll('"', '').replaceAll(',', ''));
});
test('Stylish format test 2', () => {
  expect(gendiff('filepath1.yml', 'filepath2.yml', 'stylish')).toEqual(readFile('expectedYML.yml'));
});
test('Plain format test', () => {
  const expectedPlain = [
    "Property 'common.follow' was added with value: false",
    "Property 'common.setting2' was removed",
    "Property 'common.setting3' was updated. From true to null",
    "Property 'common.setting4' was added with value: 'blah blah'",
    "Property 'common.setting5' was added with value: [complex value]",
    "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'",
    "Property 'common.setting6.ops' was added with value: 'vops'",
    "Property 'group1.baz' was updated. From 'bas' to 'bars'",
    "Property 'group1.nest' was updated. From [complex value] to 'str'",
    "Property 'group2' was removed",
    "Property 'group3' was added with value: [complex value]",
  ].join('\n');
  expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain);
});
test('JSON format test', () => {
  expect(gendiff('file1.json', 'file2.json', 'json')).toEqual(readFile('exampleJSON.json'));
});
