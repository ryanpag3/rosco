import { Command } from 'src/../../types/command';

const Help: Command = {
    id: '4c15aafb-7f98-41f8-927c-a63d8a7d260f',
    name: 'help',
    description: 'Get bot help',
    handler: async (interaction, user, server) => {
        return interaction.reply({
            embeds: [
                {
                    description: `For bot documentation, see: https://wiki.roscobot.com`
                }
            ],
            ephemeral: true
        });
    }
};

export default Help;