import fs from 'fs';  
import path from 'path';
import removeMd from 'remove-markdown';
import logger from '../src/util/logger';

const content = fs.readFileSync(path.join(__dirname, './CHANGELOG.md'));

if(!content)
    throw new Error('Could not parse CHANGELOG');

const lines = content.toString().split('\n');

let output = ':notepad_spiral:\\n\\n';
for (let [i, line] of lines.entries()) {
    if (line.startsWith('# [') && i !== 0)
        break;

    line = removeLink(line);

    if (i === 0) {
        line = `**${line}**`
    } else if (line.startsWith('*')) {
        line = line.slice(1, line.length);
        line = `:small_blue_diamond: ${line}`;
    } else if (line.length > 1){
        line = `**${line}**`;
    }

    output += line + '\\n';
}

function removeLink(line: string) {
    return removeMd(line, {
        stripListLeaders: false
    })
}

logger.debug(output);


