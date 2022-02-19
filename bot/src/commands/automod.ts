import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import { RuleBuilderOptions } from '../service/auto-mod';
import BannedWordsAdd from './automod-banned-words-add.sub';
import BannedWordsDelete from './automod-banned-words-delete.sub';
import BannedWordsDisable from './automod-banned-words-disable.sub';
import BannedWordsEnable from './automod-banned-words-enable.sub';
import BannedWordsList from './automod-banned-words-list.sub';

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
                        },
                        ...RuleBuilderOptions
                    ]
                },
                {
                    name: 'delete',
                    description: 'Delete a banned word from the banned word list.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'word',
                            description:  'The word you would like to delete from the list.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        ...RuleBuilderOptions
                    ]
                },
                {
                    name: 'list',
                    description: 'List out the currently banned words.',
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
        const subgroup = interaction.options.getSubcommandGroup();
        const subcmd = interaction.options.getSubcommand();

        switch (subgroup) {
            case 'banned-words': 
                switch (subcmd) {
                    case 'enable':
                        return BannedWordsEnable.handler(interaction, user, server);
                    case 'disable':
                        return BannedWordsDisable.handler(interaction, user, server);
                    case 'add':
                        return BannedWordsAdd.handler(interaction, user, server);
                    case 'delete':
                        return BannedWordsDelete.handler(interaction, user, server);
                    case 'list':
                        return BannedWordsList.handler(interaction, user, server);
                }
        }
    } 
}

export default AutoMod;