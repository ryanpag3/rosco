import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import TimerCreate from './timer-create.sub';

const Timer: Command = {
    id: 'f28d9eda-81e9-404c-ad70-9423d9cdb105',
    name: 'timer',
    description: 'Issue commands related to timers.',
    options: [
        {
            name: 'create',
            description: 'Create a timer.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The unique name identifying the timer.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'time',
                    description: 'The amount of time to countdown. Format is DD:HH:MM:SS',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'message',
                    description: 'The message to be displayed when the timer finishes.',
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: 'info',
            description: 'Get info on a timer.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the timer to get info on.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a timer.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name of the timer you want to delete.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const sub = interaction.options.getSubcommand();

        switch(sub) {
            case 'create':
                return TimerCreate.handler(interaction, user, server);
        }
    }
}

export default Timer;