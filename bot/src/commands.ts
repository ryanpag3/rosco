import fs from 'fs';
import path from 'path';
import logger from './util/logger';

const filenames = fs.readdirSync(path.join(__dirname, './commands')).filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts'));
let COMMANDS: any = {};
try {
    filenames.forEach((f) => {
        const module = require(path.join(__dirname, `./commands/${f}`)).default;
        COMMANDS[module.name] = module;
        logger.debug(`loaded ${module.name}`);
    });
} catch (e) {
    logger.error(e);
    throw e;
}

if (JSON.stringify(COMMANDS) === '{}')
    throw new Error('Commands not properly initialized. Exiting...');

export default COMMANDS;
