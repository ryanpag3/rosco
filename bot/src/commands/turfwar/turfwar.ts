import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import Plot from './plot.sub';

const TurfWar: Command = {
    id: '5a3ab02d-0451-442f-91a7-cce448ce9129',
    name: 'turfwar',
    description: 'Run various commands related to the turfwar feature.',
    options: [
        {
            name: 'plot',
            description: 'Plot a square on the map.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'color',
                    description: 'The color of the square on the map.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'x-coord',
                    description: 'The coordinate on the map for the X-axis (horizontal).',
                    type: ApplicationCommandOptionType.Number,
                    required: true
                },
                {
                    name: 'y-coord',
                    description: 'The coordinate on the map for Y-axis (vertical).',
                    type: ApplicationCommandOptionType.Number,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const sub = interaction.options.getSubcommand();

        switch(sub) {
            case 'plot':
                return Plot.handler(interaction, user, server);
            default:
                throw new BotError(`Invalid subcommand provided.`);
        }
    }
}

export default TurfWar;