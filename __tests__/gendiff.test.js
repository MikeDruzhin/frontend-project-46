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

test('first', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(readFile('expected.json').replaceAll('"', '').replaceAll(',', ''));
});
test('second', () => {
  expect(gendiff('filepath1.yml', 'filepath2.yml')).toEqual(readFile('expectedYML.yml'));
});
test('third', () => {
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
  expect(gendiff('file1.json', 'file2.json')).toEqual(expectedPlain);
});
