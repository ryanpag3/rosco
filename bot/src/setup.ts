import 'chartjs-plugin-datalabels';

import { CacheType, Client, CommandInteraction, Message } from 'discord.js';
// prevent race condition
import * as CommandDeployer from './util/slash-command-deployer';
import onReady from './event/ready';
import onInteractionCreate from './event/interaction-create';
import onMessageReceived from './event/message';
import { onGuildCreate } from './event/guild-create';
import { onMessageActionAdd } from './event/message-reaction-add';
import { onMessageReactionRemove } from './event/message-reaction-remove';
import onGuildMemberAdd from './event/guild-member-add';
import * as ScheduledTaskExecutor from './util/scheduled-task-executor';
import execa from 'execa';
import logger from './util/logger';
import LinkCache from './service/link-cache';
import KeywordCache from './service/keyword-cache';
import BannedWordCache from './service/banned-word-cache';
import * as Mtcg from './service/mtcg';

export default async function (client: Client) {
    try {
        logger.debug('migrating prisma schema');
        await execa.command('yarn migrate deploy');
        logger.info('schema migrated');
    } catch (e) {
        logger.error(e);
        throw e;
    }

    await Mtcg.setup();

    await KeywordCache.baselineFromDatabase();

    await BannedWordCache.baselineFromDatabase();

    await LinkCache.baselineFromDatabase();
    
    // deploy slash commands
    await CommandDeployer.deploy();

    // start timer daemon
    ScheduledTaskExecutor.start();

    client.on('ready', () => onReady());

    client.on('guildCreate', async (guild) => onGuildCreate(guild));

    client.on('interactionCreate', async interaction => onInteractionCreate(interaction as CommandInteraction<CacheType>));

    client.on('messageCreate', async (message: Message) => onMessageReceived(message));

    client.on('messageReactionAdd', async (reaction, user) => onMessageActionAdd(reaction as any, user as any));
    
    client.on('messageReactionRemove', async (reaction, user) => onMessageReactionRemove(reaction as any, user as any));

    client.on('guildMemberAdd', async (member) => onGuildMemberAdd(member));
}
