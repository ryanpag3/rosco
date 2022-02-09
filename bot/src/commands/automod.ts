import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import logger from '../util/logger';
import BannedWordsDisable from './automod-banned-words-disable.sub';
import BannedWordsEnable from './automod-banned-words-enable.sub';

const AUTO_MOD_ACTIONS_SUBCOMMANDS = [
    {
        name: 'action-add',
        description: 'Add an action to take when rule is broken.',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'name',
                description: 'The name of the action you would like to add.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'action-remove',
        description: 'Stop the bot from taking an action when the rule is broken.',
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: 'name',
                description: 'The name of the action you would like to remove.',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'action-list',
        description: 'List out the current added actions for a rule.',
        type: ApplicationCommandOptionType.Subcommand
    }
]

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
                    name: 'enable',
                    description: 'Enable the bot to check for banned words.',
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: 'disable',
                    description: 'Disable the bot to check for banned words.',
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: 'add',
                    description: 'Add a banned word to the banned word list.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'word',
                            description:  'The word you would like to add to the list.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'remove',
                    description: 'Remove a banned word from the banned word list.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'word',
                            description:  'The word you would like to remove from the list.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'list',
                    description: 'List out the currently banned words.',
                    type: ApplicationCommandOptionType.Subcommand
                },
                ...AUTO_MOD_ACTIONS_SUBCOMMANDS
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
        const subgroup = interaction.options.getSubcommandGroup();
        const subcmd = interaction.options.getSubcommand();

        switch (subgroup) {
            case 'banned-words': 
                switch (subcmd) {
                    case 'enable':
                        return BannedWordsEnable.handler(interaction, user, server);
                    case 'disable':
                        return BannedWordsDisable.handler(interaction, user, server);
                }
        }
    } 
}

export default AutoMod;