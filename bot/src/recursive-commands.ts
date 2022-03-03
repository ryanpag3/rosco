 import { promises as fs } from 'fs';
 import path from 'path';
 import logger from './util/logger';

export const parseCommands = async () => {
    const cmds = {};
    await parseCommandsRecursively(cmds, './commands');
}

const parseCommandsRecursively = async (commandsObj: any, loc: string) => {
    const filenames = (await fs.readdir(path.join(__dirname, loc)))
        .filter((f) => {
            return (
                (f.endsWith('.ts')       || f.endsWith('.js'))       &&
                (!f.endsWith('.test.js') && !f.endsWith('.test.ts'))
            )
        }).map((f) => path.resolve(path.join(__dirname, loc), f));

    for (const fullPath of filenames) {
        const module = require(fullPath).default;
        const filename = fullPath.split('/').pop();
        commandsObj[module.name] = module;
        logger.debug(`loaded ${filename} command.`);
    }

    const subdirs = (await fs.readdir(path.join(__dirname, loc), {
        withFileTypes: true
    })).filter((f) => f.isDirectory());

    for(const subdir of subdirs) {
        const newLoc = path.join(__dirname, subdir.name);
        await parseCommandsRecursively(commandsObj, newLoc);
    }
}
