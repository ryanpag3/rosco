import { DateTime, Interval } from 'luxon';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const StopwatchStart: Command = {
    id: `31c1c151-5a12-4b31-8cd0-1f094e688524`,
    name: `stopwatch start`,
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

            if (stopwatch.startedAt && !stopwatch.stoppedAt)
                throw new BotError(`This stopwatch has already been started. Use \`/stopwatch info\` to get details.`);
                
            if (!stopwatch.startedAt) {
                stopwatch = await prisma.stopwatch.update({
                    where: {
                        name_serverId: {
                            name,
                            serverId: interaction.guild?.id as string
                        }
                    },
                    data: {
                        startedAt: new Date()
                    }
                });
            } else {
                // stopwatch was previously paused so we just remove stoppedAt
                stopwatch = await prisma.stopwatch.update({
                    where: {
                        name_serverId: {
                            name,
                            serverId: interaction.guild?.id as string
                        }
                    }, 
                    data: {
                        stoppedAt: null
                    }
                });
            }

            return interaction.reply({
                embeds: [
                    {
                        title: `:green_circle: Stopwatch has been started.`,
                        description: `The stopwatch **${name}** has been started.`,
                        fields: [
                            {
                                name: 'duration',
                                value: `${Interval.fromDateTimes(DateTime.fromJSDate(stopwatch.startedAt as Date), 
                                            DateTime.now()).toDuration().toFormat('hh:mm:ss')} (hh:mm:ss)`
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

export default StopwatchStart;