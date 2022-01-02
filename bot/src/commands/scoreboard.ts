import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import ScoreboardCreate from './scoreboard-create.sub';

const Scoreboard: Command = {
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
        }
    ],
    handler: async (interaction, user) => {
        const subcommand = interaction.options.getSubcommand();
        switch(subcommand) {
            case 'create':
                return ScoreboardCreate.handler(interaction, user);
            default:
                throw new BotError(`Invalid scoreboard subcommand issued.`);
        }
    }
};

export default Scoreboard;