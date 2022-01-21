import { ApplicationCommandOptionType } from 'discord-api-types';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { Command } from '../../types/command';
import CurrencyGrant from './currency-grant.sub';
import CurrencyLog from './currency-log.sub';
import CurrencyRevoke from './currency-revoke.sub';
import CurrencySend from './currency-send.sub';

const Currency: Command = {
    id: '84807808-614a-48cc-b962-edff455abf2e',
    name: 'currency',
    description: 'run various commands related to currency',
    options: [
        {
            name: 'grant',
            description: 'Grant a user currency.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'user',
                    description: 'The user to grant currency.',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'amount',
                    description: 'The amount of currency to grant. Defaults to 1',
                    type: ApplicationCommandOptionType.Integer
                }
            ]
        },
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
        },
        {
            name: 'send',
            description: 'Send currency to another user.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'to',
                    description: 'The user you want to send currency to.',
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
                {
                    name: 'amount',
                    description: 'The amount of currency you want to send.',
                    type: ApplicationCommandOptionType.Integer,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const sub = interaction.options.getSubcommand();
        switch (sub) {
            case 'log':
                return CurrencyLog.handler(interaction, user);
            case 'send':
                return CurrencySend.handler(interaction, user, server);
            case 'grant':
                return CurrencyGrant.handler(interaction, user, server);
            case 'revoke':
                return CurrencyRevoke.handler(interaction, user, server);
        }
    }
}

export default Currency;