import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import { getDuration } from '../util/stopwatch';

const StopwatchInfo: Command = {
    id: `b12adfe8-bdb8-4e63-9f70-8d1a27e0c6ee`,
    name: `stopwatch info`,
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString(`name`, true);

        try {
            let stopwatch = await prisma.stopwatch.findUnique({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string
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
                                value: `${getDuration(stopwatch)}`                            }
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