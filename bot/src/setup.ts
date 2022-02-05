import 'chartjs-plugin-datalabels';
import './util/command-subcommand-map';

import { CacheType, Client, CommandInteraction, Message } from 'discord.js';
// prevent race condition
import * as CommandDeployer from './util/slash-command-deployer';
import onReady from './event/ready';
import onInteractionCreate from './event/interaction-create';
import onMessageReceived from './event/message';
import { baselineKeywordCacheToDatabase, buildKeywordValues } from './service/keyword-cache';
import { onGuildCreate } from './event/guild-create';
import { onMessageActionAdd } from './event/message-reaction-add';
import { onMessageReactionRemove } from './event/message-reaction-remove';
import onGuildMemberAdd from './event/guild-member-add';
import * as ScheduledTaskExecutor from './util/scheduled-task-executor';
import execa from 'execa';
import { delay } from 'bluebird';

export default async function (client: Client) {
    await execa.command('yarn migrate deploy');

    await delay(5000);

    // baseline cache against database
    await baselineKeywordCacheToDatabase();

    // build keyword cache
    await buildKeywordValues();
    
    // deploy slash commands
    await CommandDeployer.deploy();

    // start timer daemon
    ScheduledTaskExecutor.start();

    client.on('ready', () => onReady());

    client.on('guildCreate', async (guild) => onGuildCreate(guild));

    client.on('interactionCreate', async interaction => onInteractionCreate(interaction as CommandInteraction<CacheType>));

    client.on('messageCreate', async (message: Message) => onMessageReceived(message));

    client.on('messageReactionAdd', async (reaction, user) => onMessageActionAdd(reaction, user));
    
    client.on('messageReactionRemove', async (reaction, user) => onMessageReactionRemove(reaction, user));

    client.on('guildMemberAdd', async (member) => onGuildMemberAdd(member));
}
