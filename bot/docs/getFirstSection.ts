import fs from 'fs';
import path from 'path';
import removeMd from 'remove-markdown';

const content = fs.readFileSync(path.join(__dirname, './CHANGELOG.md'));

if(!content)
    throw new Error('Could not parse CHANGELOG');

const lines = content.toString().split('\n');

let output = '';
for (let [i, line] of lines.entries()) {
    if (line.startsWith('# [') && i !== 0)
        break;

    if (line.startsWith('###')) {
        line = line.slice(4, line.length).trim();
        line = `**${line}**`;
    }

    output += line + '\\n';
}

function removeLink(line: string) {
    return removeMd(line, {
        stripListLeaders: false
    })
}

console.log(output);


