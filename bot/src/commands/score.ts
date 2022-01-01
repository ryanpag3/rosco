import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import ScoreCreate from './score-create.sub';
import ScoreDelete from './score-delete.sub';
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
                    name: 'type',
                    description: 'Choose the type of score. Valid options are "SERVER" or "CHANNEL".',
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
                    name: 'type',
                    description: 'Replace the existing type with this one.',
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
            default:
                throw new BotError(`Invalid subcommand provided.`);
        }
    }
};

export default Score;