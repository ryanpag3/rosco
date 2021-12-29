import { Client } from 'discord.js';
import * as CommandDeployer from './util/slash-command-deployer';
import onReady from './event/ready';
import onInteractionCreate from './event/interaction-create';

export default async function (client: Client) {
    // deploy slash commands
    await CommandDeployer.deploy();

    // setup events
    client.on('ready', () => onReady());
    client.on('interactionCreate', async interaction => onInteractionCreate(interaction));
}