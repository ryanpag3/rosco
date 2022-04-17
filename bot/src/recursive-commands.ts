import fs from 'fs';
import path from 'path';
import logger from './util/logger';

export const parseCommands = () => {
    const cmds = {};
    parseCommandsRecursively(cmds, path.join(__dirname,'./commands'));
    return cmds;
}

const parseCommandsRecursively = (commandsObj: any, currDir: string) => {
    const filenames = fs.readdirSync(currDir)
        .filter((f) => {
            return (
                (f.endsWith('.ts')       || f.endsWith('.js'))       &&
                (!f.endsWith('.test.js') && !f.endsWith('.test.ts'))
            )
        }).map((f) => path.resolve(currDir, f));

    for (const fullPath of filenames) {
        let module = require(fullPath).default;
        const filename = fullPath.split('/').pop();
        module.isSubCommand = filename?.endsWith('.sub.ts') || filename?.endsWith('.sub.js');
        commandsObj[module.name] = module;
        logger.debug(`loaded ${filename} command.`);
    }

    const subdirs = fs.readdirSync(currDir, {
        withFileTypes: true
    }).filter((f) => f.isDirectory());

    for(const subdir of subdirs) {
        parseCommandsRecursively(commandsObj, path.join(currDir, subdir.name));
    }
}

const COMMANDS: any = process.env.IS_API !== 'true' ? parseCommands() : {};

export default COMMANDS;
