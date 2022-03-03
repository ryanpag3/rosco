import fs from 'fs';
import path from 'path';
import logger from './util/logger';

export const parseCommands = () => {
    const cmds = {};
    parseCommandsRecursively(cmds, './commands');
    return cmds;
}

const parseCommandsRecursively = (commandsObj: any, loc: string) => {
    const filenames = fs.readdirSync(path.join(__dirname, loc))
        .filter((f) => {
            return (
                (f.endsWith('.ts')       || f.endsWith('.js'))       &&
                (!f.endsWith('.test.js') && !f.endsWith('.test.ts'))
            )
        }).map((f) => path.resolve(path.join(__dirname, loc), f));

    for (const fullPath of filenames) {
        let module = require(fullPath).default;
        const filename = fullPath.split('/').pop();
        module.isSubCommand = filename?.endsWith('.sub.ts') || filename?.endsWith('.sub.js');
        commandsObj[module.name] = module;
        logger.debug(`loaded ${filename} command.`);
    }

    const subdirs = fs.readdirSync(path.join(__dirname, loc), {
        withFileTypes: true
    }).filter((f) => f.isDirectory());

    for(const subdir of subdirs) {
        const newLoc = path.join(__dirname, subdir.name);
        parseCommandsRecursively(commandsObj, newLoc);
    }
}

const COMMANDS: any = parseCommands();

export default COMMANDS;
