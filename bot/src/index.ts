require('dotenv').config();
import { Client, Intents } from 'discord.js';
import logger from './util/logger';
import setup from './setup';

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

process.on('SIGTERM', async () => {
    try {
        logger.info('shutdown received...');
        client.destroy();
        process.exit(0);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
});

async function main() {
    try {
        logger.debug('setting up bot');
        await setup(client);
        logger.debug('logging into Discord')
        client.login(process.env.DISCORD_TOKEN);
    } catch (e) {
        logger.error(e);
    }
}

main();

export default client;