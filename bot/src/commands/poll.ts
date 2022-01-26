import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord-api-types';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { Command } from '../../types/command';
import PollClose from './poll-close.sub';
import PollCreate from './poll-create.sub';
import PollDelete from './poll-delete.sub';
import PollInfo from './poll-info.sub';
import PollList from './poll-list.sub';
import PollOpen from './poll-open.sub';

const Poll: Command = {
    id: 'ed7341f1-b1c9-4e95-af04-f11944e14710',
    name: 'poll',
    description: 'Run various actions on polls.',
    options: [
        {
            name: 'create',
            description: 'Create a poll.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'A unique one word name for this poll.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'question',
                    description: 'The question you are polling.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'option-1',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-2',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-3',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-4',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-5',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-6',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-7',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-8',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-9',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'option-10',
                    description: '-',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'info',
            description: 'Get information on a poll.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the poll you want info for.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'close',
            description: 'Close a poll, preventing further votes.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the poll you want to close.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'open',
            description: 'Open a closed poll.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the poll you want to open.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a poll.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the poll you want to delete.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'list',
            description: 'List out the current polls in the server.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                 {
                     name: 'page',
                     description: 'Increase by 1 for each page you want to view',
                     type: ApplicationCommandOptionType.Integer
                 },
                 {
                     name: 'filter',
                     description: 'Will match any name or question containing this text.',
                     type: ApplicationCommandOptionType.String
                 }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const sub = interaction.options.getSubcommand();

        switch(sub) {
            case 'create':
                return PollCreate.handler(interaction, user, server);
            case 'delete':
                return PollDelete.handler(interaction, user, server);
            case 'info':
                return PollInfo.handler(interaction, user, server);
            case 'close':
                return PollClose.handler(interaction, user, server);
            case 'open':
                return PollOpen.handler(interaction, user, server);
            case 'list':
                return PollList.handler(interaction, user, server);
        }
    }
};

export default Poll;