import 'chartjs-plugin-datalabels';
import './util/command-subcommand-map';

import { CacheType, Client, CommandInteraction, Message } from 'discord.js';
// prevent race condition
import * as CommandDeployer from './util/slash-command-deployer';
import onReady from './event/ready';
import onInteractionCreate from './event/interaction-create';
import onMessageReceived from './event/message';
import { baselineKeywordCacheToDatabase, buildKeywordValues } from './service/keyword-cache';
import logger from './util/logger';
import { onGuildCreate } from './event/guild-create';
import { CurrencyAction, handleCurrencyEvent } from './service/currency';

export default async function (client: Client) {
    // baseline cache against database
    await baselineKeywordCacheToDatabase();

    // build keyword cache
    await buildKeywordValues();
    
    // deploy slash commands
    await CommandDeployer.deploy();

    // setup events
    client.on('ready', () => onReady());

    client.on('guildCreate', async (guild) => {
        return onGuildCreate(guild)
    });

    client.on('interactionCreate', async interaction => { 
        await handleCurrencyEvent(CurrencyAction.COMMAND, interaction);
        return onInteractionCreate(interaction as CommandInteraction<CacheType>) 
    });

    client.on('messageCreate', async (message: Message) => {
        await handleCurrencyEvent(CurrencyAction.MESSAGE, message);
        return onMessageReceived(message)
    });

    client.on('messageReactionAdd', async (reaction) => {
        await handleCurrencyEvent(CurrencyAction.REACTION, reaction.message, reaction);
        logger.info('reaction added');
    });
    
    client.on('messageReactionRemove', (reaction) => logger.info('reaction removed'));
}
