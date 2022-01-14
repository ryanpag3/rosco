import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import CurrencyLog from './currency-log.sub';

const Currency: Command = {
    id: '84807808-614a-48cc-b962-edff455abf2e',
    name: 'currency',
    description: 'run various commands related to currency',
    options: [
        {
            name: 'log',
            description: 'Audit currency events.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'channel',
                    description: 'If set, we will log all currency events to this channel.',
                    type: ApplicationCommandOptionType.Channel
                },
                {
                    name: 'active',
                    description: 'Toggle logging functionality.',
                    type: ApplicationCommandOptionType.Boolean
                }
            ]
        }
    ],
    handler: async (interaction, user) => {
        const sub = interaction.options.getSubcommand();
        switch (sub) {
            case 'log':
                return CurrencyLog.handler(interaction, user);
        }
    }
}

export default Currency;