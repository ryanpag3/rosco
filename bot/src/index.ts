require('dotenv').config();
import { Client, Intents } from 'discord.js';
import logger from './util/logger';
import setup from './setup';

const client = new Client({ intents: [ 
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
] });

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

process.on('uncaughtException', (error) => {
    // make sure the process exits if we hit a compilation error, so ts-node-dev can restart on next change
    if(error.message.includes('Compilation error in') || error.message.includes('Unable to compile')) process.exit(0);
});

async function main() {
    try {
        logger.debug('setting up bot');
        await setup(client);
        logger.debug('logging into Discord')
        await client.login(process.env.DISCORD_TOKEN);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
}

main();

export default client;