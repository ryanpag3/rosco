import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as chrono from 'chrono-node';
import { DateTime } from 'luxon';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const AnnounceCreate: Command = {
    id: '4575b923-4875-4b76-8914-a44a3c7dce1a',
    name: 'announce create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const channel = interaction.options.getChannel('channel', true);
        const message = interaction.options.getString('message', true);
        const when = interaction.options.getString('when', true);

        const abbreviatedTz = DateTime.now().setZone(server.timezone).toFormat('TTT').split(' ')[1];

        const instant = DateTime.now().setZone(server.timezone);

        const whenDate = chrono.parseDate(when,
            {
                timezone: abbreviatedTz,
                instant: instant.toJSDate()
            });

        logger.debug(whenDate);

        if (!whenDate)
            throw new BotError('Could not interpret date from what was provided.');

        try {
            await prisma.announcement.create({
                data: {
                    createdById: user.id,
                    serverId: server.id,
                    channelId: channel.id,
                    message,
                    name,
                    announceAt: whenDate
                }
            })
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT)
                throw new BotError('An announcement with that name already exists.');
            throw e;
        }
    
        return interaction.reply({
            embeds: [
                {
                    title: `:loudspeaker: An announcement has been created`,
                    fields: [
                        {
                            name: 'name',
                            value: name
                        },
                        {
                            name: `message`,
                            value: message
                        },
                        {
                            name: `when`,
                            value: DateTime.fromJSDate(whenDate).setZone(server.timezone).toFormat('D tt ZZZZ')
                        }
                    ]
                }
            ]
        })
    }
};

export default AnnounceCreate;