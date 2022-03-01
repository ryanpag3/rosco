import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import { RuleBuilderOptions } from '../service/auto-mod';
import BannedWordsAdd from './automod-banned-words-add.sub';
import BannedWordsDelete from './automod-banned-words-delete.sub';
import BannedWordsDisable from './automod-banned-words-disable.sub';
import BannedWordsEnable from './automod-banned-words-enable.sub';
import BannedWordsList from './automod-banned-words-list.sub';
import CapslockDetectConfig from './automod-capslock-detect-config.sub';
import CapslockDetectDisable from './automod-capslock-detect-disable.sub';
import CapslockDetectEnable from './automod-capslock-detect-enable.sub';
import LinkDetectAllowList from './automod-link-detect-allow-list.sub';
import LinkDetectAllow from './automod-link-detect-allow.sub';
import LinkDetectDeny from './automod-link-detect-deny.sub';
import LinkDetectDisable from './automod-link-detect-disable.sub';
import LinkDetectEnable from './automod-link-detect-enable.sub';
import RuleAdd from './automod-rule-add.sub';
import RuleList from './automod-rule-list.sub';
import AutoModRuleRemove from './automod-rule-remove.sub';

const AutoMod: Command = {
    id: '3m928f7a-49ff-4419-9a2d-f1b72f024ba7',
    name: 'automod',
    description: 'Manage various AutoMod features.',
    options: [
        {
            name: 'rule',
            description: 'Manage AutoMod rules.',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'add',
                    description: 'Add an AutoMod rule.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'module',
                            description: 'Which module to set rule for. Can be "banned-words" or "capslock-detect".',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        {
                            name: 'action',
                            description: 'The action to take when the rule is broken. Can be either "timeout", "kick", or "ban".',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        {
                            name: 'duration',
                            description: 'The duration, in seconds, to take action on the user when the rule is broken.',
                            type: ApplicationCommandOptionType.Integer,
                            required: true
                        },
                        {
                            name: 'violations',
                            description: 'The amount of violations to allow before taking action on the user.',
                            type: ApplicationCommandOptionType.Integer,
                            required: true
                        },
                        {
                            name: 'cooldown',
                            description: 'The amount of time to wait, in seconds, before resetting the violation count.',
                            type: ApplicationCommandOptionType.Integer,
                            required: true
                        }
                    ]
                },
                {
                    name: 'remove',
                    description: 'Remove an AutoMod rule.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'module',
                            description: 'Which module to remove the rule for.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                        {
                            name: 'action',
                            description: 'The action to stop performing when the module rule is broken.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'list',
                    description: 'List out the AutoMod rules for a particular module.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'module',
                            description: 'Which module to list rules for.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        },
                    ]
                }
            ]
        },
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
            name: 'capslock-detect',
            description: 'Manage capslock detection AutoMod functionality.',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'enable',
                    description: 'Enable capslock detection.',
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: 'disable',
                    description: 'Disable capslock detection.',
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: 'config',
                    description: 'Configure the capslock detection',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'length',
                            description: 'The amount of consecutive capitalized characters to allow. Default is 12.',
                            type: ApplicationCommandOptionType.Integer
                        }
                    ]
                }
            ]
        },
        {
            name: 'link-detect',
            description: 'Manage link detection.',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'enable',
                    description: 'Enable link detection.',
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: 'disable',
                    description: 'Disable link detection.',
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: 'allow',
                    description: 'Add a link or pattern to the allow list.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'pattern',
                            description: 'The link or pattern you want to allow.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'deny',
                    description: 'Remove a link from the allow list. This will fail if link not explicitely allowed first.',
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: 'pattern',
                            description: 'The link or pattern you want to deny.',
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: 'allow-list',
                    description: 'List out the current allow list.',
                    type: ApplicationCommandOptionType.Subcommand
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const subgroup = interaction.options.getSubcommandGroup();
        const subcmd = interaction.options.getSubcommand();

        switch (subgroup) {
            case 'rule': {
                switch (subcmd) {
                    case 'add':
                        return RuleAdd.handler(interaction, user, server);
                    case 'remove':
                        return AutoModRuleRemove.handler(interaction, user, server);
                    case 'list':
                        return RuleList.handler(interaction, user, server);
                }
                break;
            }

            case 'banned-words': {
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
                break;
            }

            case 'capslock-detect': {
                switch (subcmd) {
                    case 'enable':
                        return CapslockDetectEnable.handler(interaction, user, server);
                    case 'disable':
                        return CapslockDetectDisable.handler(interaction, user, server);
                    case 'config':
                        return CapslockDetectConfig.handler(interaction, user, server);
                }
                break;
            }

            case 'link-detect': {
                switch(subcmd) {
                    case 'enable':
                        return LinkDetectEnable.handler(interaction, user, server);
                    case 'disable':
                        return LinkDetectDisable.handler(interaction, user, server);
                    case 'allow':
                        return LinkDetectAllow.handler(interaction, user, server);
                    case 'deny':
                        return LinkDetectDeny.handler(interaction, user, server);
                    case 'allow-list':
                        return LinkDetectAllowList.handler(interaction, user, server);
                }
            }
        }
    } 
}

export default AutoMod;