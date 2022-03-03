import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { DateTime, Duration, Interval } from 'luxon';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';

const StopwatchReset: Command = {
    id: `544eff62-e831-4840-a61c-d7e988c677ac`,
    name: `stopwatch reset`,
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString(`name`, true);

        try {
            let stopwatch = await prisma.stopwatch.update({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string
                    }
                },
                data: {
                    startedAt: null,
                    stoppedAt: null
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `Stopwatch has been reset.`,
                        description: `The stopwatch **${name}** has been reset to 00:00:00.`
                    }
                ]
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025')
                    throw new BotError(`Cannot reset a stopwatch that does not exist.`);
            }
            throw e;
        }
    } 
};

export default StopwatchReset;