import logger from './logger';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { hashElement } from 'folder-hash';
import COMMANDS from '../commands';
import path from 'path';
import { promises as fs } from 'fs';

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN as string);

const keys = Object.keys(COMMANDS);
const mappedCommands = keys.map((c: any) => {
    return {
        name: COMMANDS[c].name,
        description: COMMANDS[c].description,
        options: COMMANDS[c].options
    }
});

export async function deploy() {
    const needsDeployment = await commandsNeedToBeDeployed();

    if (!needsDeployment)
        return

    return new Promise(async (resolve, reject) => {
        logger.debug(`deploying slash commands`);
        try {
            if (process.env.NODE_ENV !== 'production') {
                // register with test server
                await rest.put(
                    Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID as string, process.env.TEST_GUILD_ID as string),
                    {
                        body: mappedCommands
                    }
                );
            } else {
                // register globally in production
                await rest.put(
                    Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID as string),
                    {
                        body: mappedCommands
                    }
                );
            }
            logger.debug(`slash commands registered`);
            resolve(undefined);
        } catch (e) {
            logger.error(`Failed to deploy slash commands.`, e);
            throw e;
        }
    });
}

const commandsNeedToBeDeployed = async () => {
    const hash = await getCommandsHash();
    const hashFile = await getHashFile();
    if (hashFile !== hash) {
        await createHashFile();
        return true;
    }
    return false;
}

const filepath = path.join(__dirname, `../commands/commands.hash`);

const createHashFile = async () => {
    const hash = await getCommandsHash();
    return fs.writeFile(filepath, hash);
}

const getCommandsHash = async () => {
    const { hash } = await hashElement(path.join(__dirname, '../commands'), {
        files: {
            exclude: [ '*.sub.ts' ],
            include: [ '*.ts' ]
        }
    });
    return hash;
}

const getHashFile = async () => {
    try {
        const res = await fs.readFile(filepath);
        return res.toString();
    } catch (e) {
        return undefined;   
    }
}