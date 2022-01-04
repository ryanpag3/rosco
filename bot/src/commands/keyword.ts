import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';

const Keyword: Command = {
    id: '29f9209f-794e-4352-908f-074078f34990',
    name: 'keyword',
    description: 'Runs various commands related to keywords.',
    examples: ``,
    options: [
        {
            name: 'create',
            description: 'Create a keyword and assign it to a score. When users type the keyword the score will change.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'keyword',
                    description: 'The keyword or phrase to check.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'score-name',
                    description: 'The name of the score to assign the keyword to.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'action',
                    description: 'Which action to take on the score when keyword is found. Valid options are "up" or "down".',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'amount',
                    description: 'Optionally set the amount to increase or decrease the score when keyword is found.',
                    type: ApplicationCommandOptionType.Integer
                },
                {
                    name: 'channel',
                    description: 'Optionally limit the keyword detection to a specific channel.',
                    type: ApplicationCommandOptionType.Channel
                },
                {
                    name: 'user',
                    description: 'Optionally limit the keyword detection to a specific user.',
                    type: ApplicationCommandOptionType.User
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a keyword for a score.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'keyword',
                    description: 'The keyword or phrase you want to delete.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'score-name',
                    description: 'The name of the score that the keyword is assigned to.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'list',
            description: 'List out active keywords.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'keyword',
                    description: 'Optionally, filter the list by a keyword or phrase.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'score-name',
                    description: 'Optionally, filter the list by keywords assigned to this score.',
                    type: ApplicationCommandOptionType.String
                }
            ]
        }
    ],
    handler: async (interaction, user) => {

    }
};

export default Keyword;