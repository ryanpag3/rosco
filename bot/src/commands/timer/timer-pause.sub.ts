import { Server, Timer, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CacheType, CommandInteraction } from 'discord.js';
import { DateTime, Duration } from 'luxon';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const TimerPause: Command = {
    id: '3474f749-7849-4586-852c-3106d9d3e451',
    name: 'timer pause',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);

        let timer;
        try {
            const where = {
                name_serverId: {
                    name,
                    serverId: server?.id as string
                }
            };

            timer = await prisma.timer.findUnique({
                    where
            });

            if (!timer.expiresOn)
                return unpauseTimer(interaction, user, server as Server, timer);

            const duration = DateTime.fromJSDate(timer?.expiresOn as any).diff(DateTime.now());

            await prisma.timer.update({
                where,
                data: {
                    pausedDuration: duration.toISO(),
                    expiresOn: null
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:pause_button: Timer has been paused.`,
                        description: `The timer **${timer?.name}** has been paused.`
                    }
                ]
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Could not find timer to pause.');
            throw e;            
        }
    }
};

const unpauseTimer = async (interaction: CommandInteraction<CacheType>, user: User, server: Server, timer: Timer) => {
    const duration = Duration.fromISO(timer.pausedDuration as any);

    const expiresOn = DateTime.now().plus(duration);

    await prisma.timer.update({
        where: {
            id: timer.id
        },
        data: {
            expiresOn: expiresOn.toJSDate(),
            pausedDuration: null
        }
    });

    return interaction.reply({
        embeds: [
            {
                title: `:pause_button: Timer has been unpaused.`,
                description: `The timer **${timer?.name}** has been unpaused.`
            }
        ]
    })
};

export default TimerPause;