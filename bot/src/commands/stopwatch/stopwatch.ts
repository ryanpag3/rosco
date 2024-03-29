import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../../types/command';
import StopwatchCreate from './stopwatch-create.sub';
import StopwatchDelete from './stopwatch-delete.sub';
import StopwatchInfo from './stopwatch-info.sub';
import StopwatchList from './stopwatch-list.sub';
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
                    name: `start-on-create`,
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
                    description: 'The name of the stopwatch you want to reset.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'info',
            description: 'Get info on a stopwatch.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the stopwatch you want to view.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'list',
            description: 'List all the stopwatches.',
            type: ApplicationCommandOptionType.Subcommand
        },
    ],
    handler: async (interaction, user, server) => {
        const subcommand = interaction.options.getSubcommand();

        switch(subcommand){
            case 'create':
                return StopwatchCreate.handler(interaction, user, server);
            case `start`:
                return StopwatchStart.handler(interaction, user, server); 
            case `stop`:
                return StopwatchStop.handler(interaction, user, server);
            case `reset`:
                return StopwatchReset.handler(interaction, user, server);
            case `delete`:
                return StopwatchDelete.handler(interaction, user, server);
            case 'info':
                return StopwatchInfo.handler(interaction, user, server);
            case 'list':
                return StopwatchList.handler(interaction, user, server);
        }
    }
}

export default Stopwatch;