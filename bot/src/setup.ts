import 'chartjs-plugin-datalabels';
import { Client } from 'discord.js';
// prevent race condition
import './util/command-subcommand-map';
import * as CommandDeployer from './util/slash-command-deployer';
import onReady from './event/ready';
import onInteractionCreate from './event/interaction-create';

export default async function (client: Client) {
    // deploy slash commands
    await CommandDeployer.deploy();

    // setup events
    client.on('ready', () => onReady());
    // @ts-ignore
    client.on('interactionCreate', async interaction => onInteractionCreate(interaction));
}