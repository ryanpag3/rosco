import { Interaction } from 'discord.js';
import COMMANDS from '../commands';

export default async function(interaction: Interaction) {
    if (!interaction.isCommand())
    return;

    const { handler } = COMMANDS[interaction.commandName];

    if (!handler) {
        return interaction.reply('command not found.');
    }

    await handler(interaction);
}