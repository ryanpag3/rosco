 import { Command } from '../../types/command';
import prisma from '../util/prisma';
import { getDuration } from '../util/stopwatch';

const StopwatchList: Command = {
    id: 'cc354bf6-73c5-47cb-b61c-a8e5d967f753',
    name: 'stopwatch list',
    handler: async (interaction, user, server) => {
        const stopwatches = await prisma.stopwatch.findMany({
            where: {
                serverId: server?.id
            },
            include: {
                User: true
            }
        });

        return interaction.reply({
            embeds: [
                {
                    title: `Stopwatches`,
                    description: `**__Name - Duration__** (hh:mm:ss)\n${stopwatches.map(m => `${m.name} - _${getDuration(m, false)}_`).join('\n')}`
                }
            ]
        })
    }
};

export default StopwatchList;