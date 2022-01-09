import { DateTime, Interval } from 'luxon';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const StopwatchStop: Command = {
    id: `433a40e2-f284-453f-aad7-3158d5a7acaa`,
    name: `stopwatch stop`,
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
                throw new BotError(`Cannot stop stopwatch that does not exist.`);

            if (!stopwatch.startedAt)
                throw new BotError(`Cannot stop a stopwatch that has not been started.`);

            if (stopwatch.stoppedAt)
                throw new BotError(`This stopwatch has already been stopped. Use \`/stopwatch info\` to get details.`);
                
            stopwatch = await prisma.stopwatch.update({
                where: {
                    name_serverId: {
                        name,
                        serverId: interaction.guild?.id as string
                    }
                },
                data: {
                    stoppedAt: new Date()
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:red_circle: Stopwatch has been stopped.`,
                        description: `The stopwatch **${name}** has been stopped.`,
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

export default StopwatchStop;