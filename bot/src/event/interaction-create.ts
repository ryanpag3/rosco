import { Interaction } from 'discord.js';

export default async function(interaction: Interaction) {
    if (!interaction.isCommand())
    return;

    if (interaction.commandName === 'bing') {
        await interaction.reply('bong');
    }
}