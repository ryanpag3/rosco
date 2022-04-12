import fs from 'fs';
import path from 'path';

const content = fs.readFileSync(path.join(__dirname, './CHANGELOG.md'));

if(!content)
    throw new Error('Could not parse CHANGELOG');

const lines = content.toString().split('\n');

let output = '';
for (const [i, line] of lines.entries()) {
    if (line.startsWith('# [') && i !== 0)
        break;
    output += line + '\n';
}

console.log(output);