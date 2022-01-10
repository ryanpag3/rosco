import { DateTime, Duration, Interval } from 'luxon';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import prisma from '../util/prisma';

const StopwatchInfo: Command = {
    id: `b12adfe8-bdb8-4e63-9f70-8d1a27e0c6ee`,
    name: `stopwatch info`,
    handler: async (interaction, user) => {
        const name = interaction.options.getString(`name`, true);

        try {
            let stopwatch = await prisma.stopwatch.findUnique({
                where: {
                    name_serverId: {
                        name,
                        serverId: interaction.guild?.id as string
                    }
                }
            });

            if (!stopwatch)
                throw new BotError(`Cannot start stopwatch that does not exist.`);

            return interaction.reply({
                embeds: [
                    {
                        title: `:computer: Found information for stopwatch.`,
                        fields: [
                            {
                                name: 'name',
                                value: name
                            },
                            {
                                name: 'duration',
                                value: `${!stopwatch.startedAt && !stopwatch.stoppedAt ? '00:00:00' : Interval.fromDateTimes(DateTime.fromJSDate(stopwatch.startedAt as Date), 
                                            stopwatch.stoppedAt ? DateTime.fromJSDate(stopwatch.stoppedAt) : DateTime.now()).toDuration().toFormat('hh:mm:ss')} (hh:mm:ss)`
                            }
                        ]
                    }
                ]
            });
        } catch (e) {
            throw e;
        }
    } 
};

export default StopwatchInfo;