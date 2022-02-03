import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DateTime } from 'luxon';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';
import { buildTimestamp } from '../util/timer-executor';

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
                },
                rejectOnNotFound: true
            });
        } catch(e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Timer was not found by that name.');
            throw e;
        }

        const duration = DateTime.fromJSDate(timer?.expiresOn as any).diff(DateTime.now());

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
                            value: buildTimestamp(duration)
                        }
                    ]
                }
            ]
        })
    }
};

export default TimerInfo;