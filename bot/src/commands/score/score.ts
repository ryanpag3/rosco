import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import ScoreCreate from './score-create.sub';
import ScoreDelete from './score-delete.sub';
import ScoreDown from './score-down.sub';
import ScoreList from './score-list.sub';
import ScoreUp from './score-up.sub';
import ScoreUpdate from './score-update.sub';

const Score: Command = {
    id: 'c9f67e01-1072-40ce-ac90-1f0a17f55815',
    name: 'score',
    description: 'Perform an action on a score.',
    examples: ``,
    options: [
        {
            name: 'create',
            description: 'Create a score.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'A unique name describing the score. (e.g `touchdowns`)',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'description',
                    description: 'An optional description.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'amount',
                    description: 'Set the starting amount of the score.',
                    type: ApplicationCommandOptionType.Integer
                },
                {
                    name: 'color',
                    description: 'Set the color of the bar when displayed via `/score list`.',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'update',
            description: 'Update an existing score.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The current name of the score you want to update.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'new-name',
                    description: 'Replace the existing name with this one.',
                    type: ApplicationCommandOptionType.String,
                },
                {
                    name: 'description',
                    description: 'Replace the existing description with this one.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'amount',
                    description: 'Update the score amount.',
                    type: ApplicationCommandOptionType.Integer
                },
                {
                    name: 'color',
                    description: 'Update the color of the bar when displayed via `/score list`.',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a score.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the score you want to delete.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'up',
            description: 'Increase score count.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the score you want to increae.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'amount',
                    description: 'The amount you want to increase. Defaults to 1.',
                    type: ApplicationCommandOptionType.Integer
                }
            ]
        },
        {
            name: 'down',
            description: 'Decrease score count.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the score you want to decrease.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'amount',
                    description: 'The amount you want to decrease. Defaults to 1.',
                    type: ApplicationCommandOptionType.Integer
                }
            ]
        },
        {
            name: 'list',
            description: 'List out all of the scores.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'amount',
                    description: 'The amount of scores to return. Default is 10.',
                    type: ApplicationCommandOptionType.Integer
                },
                {
                    name: 'scoreboard',
                    description: 'List only the scores contained in this scoreboard.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'page',
                    description: 'Which page to display. Default is 1.',
                    type: ApplicationCommandOptionType.Integer
                },
                {
                    name: 'filter',
                    description: 'Provide a pattern to filter score names on.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'include-raw',
                    description: 'Includes a raw print out of the score data in the description.',
                    type: ApplicationCommandOptionType.Boolean
                },
                {
                    name: 'default-amount',
                    description: 'Update the default amount of scores returned.',
                    type: ApplicationCommandOptionType.Integer
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const subcommand = interaction.options.getSubcommand();
        switch(subcommand) {
            case 'create':
                return ScoreCreate.handler(interaction, user, server);
            case 'update':
                return ScoreUpdate.handler(interaction, user, server);
            case 'delete':
                return ScoreDelete.handler(interaction, user, server);
            case 'up':
                return ScoreUp.handler(interaction, user, server);
            case 'down':
                return ScoreDown.handler(interaction, user, server);
            case 'list':
                return ScoreList.handler(interaction, user, server);
            default:
                throw new BotError(`Invalid subcommand provided.`);
        }
    }
};

export default Score;