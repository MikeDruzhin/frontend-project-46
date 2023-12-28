import { readFileSync } from 'fs';

const file1 = readFileSync('./file1.json', 'utf-8');
const file2 = readFileSync('./file2.json', 'utf-8');

console.log(file1);
export { file1, file2 };
