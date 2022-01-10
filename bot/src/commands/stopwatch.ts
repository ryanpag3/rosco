import { ApplicationCommandOptionType } from 'discord-api-types';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { Command } from '../../types/command';
import StopwatchCreate from './stopwatch-create.sub';
import StopwatchDelete from './stopwatch-delete.sub';
import StopwatchReset from './stopwatch-reset.sub';
import StopwatchStart from './stopwatch-start.sub';
import StopwatchStop from './stopwatch-stop.sub';

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
        },
        {
            name: 'delete',
            description: 'Delete a stopwatch.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the stopwatch you want to delete.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'start',
            description: 'Start an existing stopwatch.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                 {
                     name: 'name',
                     description: 'The name of the stopwatch you want to start.',
                     type: ApplicationCommandOptionType.String,
                     required: true
                 }
            ]
        },
        {
            name: 'stop',
            description: 'Stop an existing stopwatch.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the stopwatch you want to stop.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'reset',
            description: 'Reset a stopwatch to 00:00:00',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the stopwatch you want to stop.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user) => {
        const subcommand = interaction.options.getSubcommand();

        switch(subcommand){
            case 'create':
                return StopwatchCreate.handler(interaction, user);
            case `start`:
                return StopwatchStart.handler(interaction, user); 
            case `stop`:
                return StopwatchStop.handler(interaction, user);
            case `reset`:
                return StopwatchReset.handler(interaction, user);
            case `delete`:
                return StopwatchDelete.handler(interaction, user);
        }
    }
}

export default Stopwatch;