import 'chartjs-plugin-datalabels';
import './util/command-subcommand-map';

import { Client, Message } from 'discord.js';
// prevent race condition
import * as CommandDeployer from './util/slash-command-deployer';
import onReady from './event/ready';
import onInteractionCreate from './event/interaction-create';
import onMessageReceived from './event/message';
import { baselineKeywordCacheToDatabase, buildKeywordValues } from './service/keyword-cache';
import logger from './util/logger';
import { onGuildCreate } from './event/guild-create';

export default async function (client: Client) {
    // baseline cache against database
    await baselineKeywordCacheToDatabase();

    // build keyword cache
    await buildKeywordValues();
    
    // deploy slash commands
    await CommandDeployer.deploy();

    // setup events
    client.on('ready', () => onReady());

    client.on('guildCreate', async (guild) => onGuildCreate(guild));

    client.on('interactionCreate', async interaction => grantCurrencyWrapper('interactionCreate', onInteractionCreate, interaction));

    client.on('messageCreate', (message: Message) => grantCurrencyWrapper('messageCreate', onMessageReceived, message));

    client.on('messageReactionAdd', (reaction) => logger.info(reaction));
    
    client.on('messageReactionRemove', (reaction) => logger.info(reaction));
}

const grantCurrencyWrapper = async (event: string, callback: any, passObj?: any) => {
    
    return callback(passObj) 
}