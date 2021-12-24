import fs from 'fs';
import path from 'path';
import logger from './util/logger';

const filenames = fs.readdirSync(path.join(__dirname, './commands')).filter(f => f.endsWith('.ts'));
let COMMANDS: any = {};
try {
    filenames.forEach((f) => {
        logger.info(f);
        const module = require(path.join(__dirname, `./commands/${f}`)).default;
        logger.info(`${module.name}`);
        COMMANDS[module.name] = module;
    });

} catch (e) {
    logger.error(e);
    throw e;
}

export default COMMANDS;
