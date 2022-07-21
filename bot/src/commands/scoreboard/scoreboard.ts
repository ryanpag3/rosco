import { ApplicationCommandOptionType } from 'discord-api-types';
import { Application } from 'discord.js';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import ScoreboardList from './list.sub';
import ScoreboardCreate from './scoreboard-create.sub';
import ScoreboardDelete from './scoreboard-delete.sub';
import ScoreboardScoreAdd from './scoreboard-score-add.sub';
import ScoreboardScoreRemove from './scoreboard-score-remove.sub';
import ScoreboardUpdate from './scoreboard-update.sub';
import ScoreboardUp from './up.sub';

const Scoreboard: Command = {
    id: `d60c799e-19e0-4d59-9145-7354027e8da4`,
    name: 'scoreboard',
    description: 'Run various commands for scoreboards.',
    examples: ``,
    options: [
        {
            name: 'create',
            description: 'Create a scoreboard.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of your scoreboard.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'description',
                    description: 'An optional description of your scoreboard.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'scores',
                    description: '[optional] A comma-separated list of scores to add to the scoreboard. (e.g score1,my score,score3 )',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a scoreboard.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the scoreboard to delete.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'update',
            description: 'Update an existing scoreboard.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The current name of the scoreboard you want to update.',
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
                }
            ]
        },
        {
            name: 'list',
            description: 'List out the scoreboards in a server.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'page',
                    description: 'The page of the list you want to see.',
                    type: ApplicationCommandOptionType.Number
                }
            ]
        },
        {
            name: 'add-score',
            description: 'Add a score to a scoreboard.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the scoreboard to add to.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'score-name',
                    description: 'The name of your score to add.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'remove-score',
            description: 'Remove a score to a scoreboard.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the scoreboard to remove from.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'score-name',
                    description: 'The name of your score to remove.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'up',
            description: 'Increase all scores in a scoreboard.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the scoreboard to increase.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const subcommand = interaction.options.getSubcommand();
        switch(subcommand) {
            case 'create':
                return ScoreboardCreate.handler(interaction, user, server);
            case 'delete':
                return ScoreboardDelete.handler(interaction, user, server);
            case 'update':
                return ScoreboardUpdate.handler(interaction, user, server);
            case 'list':
                return ScoreboardList.handler(interaction, user, server);
            case 'add-score':
                return ScoreboardScoreAdd.handler(interaction, user, server);
            case 'remove-score':
                return ScoreboardScoreRemove.handler(interaction, user, server);
            case 'up':
                return ScoreboardUp.handler(interaction, user, server);
            default:
                throw new BotError(`Invalid scoreboard subcommand issued.`);
        }
    }
};

export default Scoreboard;