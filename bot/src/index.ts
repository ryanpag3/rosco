require('dotenv').config();
import { Client, Intents } from 'discord.js';
import logger from './util/logger';
import setup from './setup';

if (process.env.NODE_NAME) {
    const split = process.env.NODE_NAME.split('-');
    process.env.SHARD_ID = split[split.length-1];
}

const client = new Client({
    shards: Number.parseInt(process.env.SHARD_ID || "0"),
    shardCount: Number.parseInt(process.env.SHARD_COUNT || "1"),
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});

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

process.on('unhandledException', (error) => logger.error(error));

process.on('uncaughtException', (error) => {
    logger.error(error);
    // make sure the process exits if we hit a compilation error, so ts-node-dev can restart on next change
    if (error.message.includes('Compilation error in') || error.message.includes('Unable to compile')) process.exit(1);
});

async function main() {
    try {
        if (process.env.IS_API !== 'true') {
            logger.debug('setting up bot');
            await setup(client);
        }

        logger.debug('logging into Discord')
        await client.login(process.env.DISCORD_TOKEN);
        logger.debug('logged into Discord');
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
}

main();

export default client;