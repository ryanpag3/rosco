import logger from './logger';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN as string);

// TODO
const commands = [{
    name: 'bing',
    description: 'What are you going to tell Joe Byron?'
}]

export async function deploy() {
    logger.debug(`deploying slash commands`);
    try {
        if (process.env.NODE_ENV !== 'production') {
            // register with test server
            await rest.put(
                Routes.applicationGuildCommands(process.env.DISCORD_APPLICATION_ID as string, process.env.TEST_GUILD_ID as string),
                {
                    body: commands
                }
            );
        } else {
            // register globally in production
            await rest.put(
                Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID as string),
                {
                    body: commands
                }
            );
        }
        logger.debug(`slash commands registered`);
    } catch (e) {
        logger.error(`Failed to deploy slash commands.`, e);
        throw e;
    }
}