import { ApplicationCommandOptionType } from 'discord-api-types';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { Command } from '../../types/command';
import StopwatchCreate from './stopwatch-create.sub';

const Stopwatch: Command = {
    id: '93181fbc-4e4b-478e-90a6-3e0985046ac8',
    name: 'stopwatch',
    description: `Perform various stopwatch commands.`,
    options: [
        {
            name: `create`,
            description: `Create and optionally start a stopwatch.`,
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: `name`,
                    description: `The unique name of the stopwatch.`,
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: `start-on-created`,
                    description: `Start the stopwatch when created.`,
                    type: ApplicationCommandOptionType.Boolean
                }
            ]
        }
    ],
    handler: async (interaction, user) => {
        const subcommand = interaction.options.getSubcommand();

        switch(subcommand){
            case 'create':
                return StopwatchCreate.handler(interaction, user); 
        }
    }
}

export default Stopwatch;