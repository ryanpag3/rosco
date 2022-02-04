import { getTimezone } from 'countries-and-timezones';
import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const Timezone: Command = {
    id: '8ba51ba7-23a6-496c-8ba4-ba3ff3658ed2',
    name: 'timezone',
    description: 'Set the timezone for your server',
    options: [
        {
            name: 'set',
            description: 'Set your server timezone. Example: America/Los_Angeles',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    handler: async (interaction, user, server) => {
        const timezone = interaction.options.getString('set', true);

        if (!getTimezone(timezone))
            throw new BotError('Invalid timezone provided.');

        await prisma.server.update({
            where: {
                id: server.id
            },
            data: {
                timezone
            }
        });

        return interaction.reply({
            embeds: [
                {
                    description: `Server timezone has been set to **${timezone}**`
                }
            ]
        })
    }
}

export default Timezone;