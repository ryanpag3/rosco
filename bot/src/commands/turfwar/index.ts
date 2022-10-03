import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../../types/command';
import TurfwarPlot from './plot.sub';

const Turfwar: Command = {
    id: '58991d66-ef09-48d2-8a04-e2db3de9753e',
    name: 'turfwar',
    description: 'Run various commands related to Turfwar.',
    options: [
        {
            name: 'plot',
            description: 'Plot a square on the turf.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'coords',
                    description: 'The X and Y coordinates of the square',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'color',
                    description: 'A valid hex-color for your square.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const command = interaction.options.getSubcommand();

        switch(command) {
            case 'plot':
                return TurfwarPlot.handler(interaction, user, server);
        }
    }
};

export default Turfwar;