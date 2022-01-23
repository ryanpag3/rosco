import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord-api-types';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { Command } from '../../types/command';
import PollCreate from './poll-create.sub';

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
        }
    ],
    handler: async (interaction, user, server) => {
        const sub = interaction.options.getSubcommand();

        switch(sub) {
            case 'create':
                return PollCreate.handler(interaction, user, server);
        }
    }
};

export default Poll;