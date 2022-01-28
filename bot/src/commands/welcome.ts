import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import WelcomeEnable from './welcome-enable.sub';

export enum WelcomeType {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

const Welcome: Command = {
    id: '9538eb25-a487-4df4-a375-ea0c823dc671',
    name: 'welcome',
    description: 'Manage welcome messages.',
    options: [
        {
            name: 'enable',
            description: 'Enable welcome messages on this server.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'type',
                    description: 'The type of welcome message. Valid options are "public" and "private".',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'disable',
            description: 'Disable welcome messages on this server.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'type',
                    description: 'The type of welcome message. Valid options are "public" and "private".',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'set',
            description: 'Set the welcome message.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'type',
                    description: 'The type of welcome message. Valid options are "public" and "private".',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'message',
                    description: 'The message you want to use to welcome users.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const sub = interaction.options.getSubcommand();

        switch(sub) {
            case 'enable':
                return WelcomeEnable.handler(interaction, user, server);
        }
    }
};

export default Welcome;