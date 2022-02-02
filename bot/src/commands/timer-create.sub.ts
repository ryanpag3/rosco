import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DateTime, Duration } from 'luxon';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';""
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const TimerCreate: Command = {
    id: '354ff6c7-a179-4284-bee7-abbc4871ac59',
    name: 'timer create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const time = interaction.options.getString('time', true);
        const message = interaction.options.getString('message');

        const duration = buildDurationObject(time);

        let dt = DateTime.now();
        dt = dt.plus(duration);

        try {
            await prisma.timer.create({
                data: {
                    name,
                    message,
                    createdById: user.id,
                    serverId: server?.id as string,
                    channelId: interaction.channelId,
                    expiresOn: dt.toJSDate()
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT)
                throw new BotError('A timer already exists with that name.');
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: ':alarm_clock: A timer has been created!',
                    fields: [
                        {
                            name: 'name',
                            value: name
                        },
                        {
                            name: 'message',
                            value: message || 'Timer completed.'
                        },
                        {
                            name: 'time',
                            value: time
                        }
                    ]
                }
            ]
        });
    }
}

const buildDurationObject = (time: string): Duration => {
    let split = time.split(':').map((s) => Number.parseInt(s));

    if (split.length < 3)
        throw new BotError('Invalid duration provided.');

    split = split.reverse()

    return Duration.fromDurationLike({
        seconds: split[0],
        minutes: split[1],
        hours: split[2],
        days: split[3]
    });
}

export default TimerCreate;