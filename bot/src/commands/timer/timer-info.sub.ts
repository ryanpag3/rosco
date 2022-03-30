import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DateTime, Duration } from 'luxon';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import logger from '../../util/logger';
import prisma, { NotFoundError } from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const TimerInfo: Command = {
    id: '23e9d368-5a08-48dc-8ff5-0f7cb9176158',
    name: 'timer info',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);

        let timer;
        try {
            timer = await prisma.timer.findUnique({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string
                    }
                }
            });
        } catch(e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Timer was not found by that name.');
            throw e;
        }

        const duration = timer.expiresOn ? DateTime.fromJSDate(timer?.expiresOn as any).diff(DateTime.now()) 
                                            : Duration.fromISO(timer.pausedDuration as any);

        return interaction.reply({
            embeds: [
                {
                    title: `:hourglass: Found timer!`,
                    fields: [
                        {
                            name: 'name',
                            value: name
                        },
                        {
                            name: 'message on completion',
                            value: timer?.message || 'Timer completed.'
                        },
                        {
                            name: 'time left',
                            value: duration.toFormat('dd:hh:mm:ss')
                        }
                    ]
                }
            ]
        })
    }
};

export default TimerInfo;