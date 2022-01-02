import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import ScoreCreate from './score-create.sub';
import ScoreDelete from './score-delete.sub';
import ScoreDown from './score-down.sub';
import ScoreList from './score-list.sub';
import ScoreUp from './score-up.sub';
import ScoreUpdate from './score-update.sub';

const Score: Command = {
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
                    name: 'page',
                    description: 'Which page to display. Default is 1.',
                    type: ApplicationCommandOptionType.Integer
                }
            ]
        }
    ],
    handler: async (interaction, user) => {
        const subcommand = interaction.options.getSubcommand();
        switch(subcommand) {
            case 'create':
                return ScoreCreate.handler(interaction, user);
            case 'update':
                return ScoreUpdate.handler(interaction, user);
            case 'delete':
                return ScoreDelete.handler(interaction, user);
            case 'up':
                return ScoreUp.handler(interaction, user);
            case 'down':
                return ScoreDown.handler(interaction, user);
            case 'list':
                return ScoreList.handler(interaction, user);
            default:
                throw new BotError(`Invalid subcommand provided.`);
        }
    }
};

export default Score;