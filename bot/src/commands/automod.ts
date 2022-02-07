import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';

const AutoMod: Command = {
    id: '3m928f7a-49ff-4419-9a2d-f1b72f024ba7',
    name: 'automod',
    description: 'Manage various AutoMod features.',
    options: [
        {
            name: 'banned-words',
            description: 'Manage banned words functionality.',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'toggle',
                    description: 'Toggle banned words functionality.',
                    type: ApplicationCommandOptionType.Subcommand
                }
            ]
        },
        {
            name: 'all-caps',
            description: 'Manage banned words functionality.',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'toggle',
                    description: 'Toggle banned words functionality.',
                    type: ApplicationCommandOptionType.Subcommand
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {

    } 
}

export default AutoMod;