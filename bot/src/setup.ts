import 'chartjs-plugin-datalabels';
import './util/command-subcommand-map';

import { Client, Message } from 'discord.js';
// prevent race condition
import * as CommandDeployer from './util/slash-command-deployer';
import onReady from './event/ready';
import onInteractionCreate from './event/interaction-create';
import onMessageReceived from './event/message';
import { baselineKeywordCacheToDatabase, buildKeywordValues } from './service/keyword-cache';

export default async function (client: Client) {

    // baseline cache against database
    await baselineKeywordCacheToDatabase();

    // build keyword cache
    await buildKeywordValues();

    // deploy slash commands
    await CommandDeployer.deploy();

    // setup events
    client.on('ready', () => onReady());
    // @ts-ignore
    client.on('interactionCreate', async interaction => onInteractionCreate(interaction));

    client.on('messageCreate', (message: Message) => onMessageReceived(message));

}