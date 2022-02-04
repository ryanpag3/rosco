import { DateTime } from 'luxon';
import { Command } from '../../types/command';
import prisma from '../util/prisma';

const AnnounceList: Command = {
    id: 'feee6b63-04ec-4c33-ac85-1af6705f8e38',
    name: 'announce list',
    handler: async (interaction, user, server) => {
        const page = interaction.options.getInteger('page') || 1;
        const take = 15;

        const announcements = await prisma.announcement.findMany({
            where: {
                serverId: server.id
            },
            orderBy: {
                announceAt: 'asc'
            },
            take,
            skip: page > 1 ? take * page : 0
        });

        return interaction.reply({
            embeds: [
                {
                    title: ':loudspeaker: Announcements found!',
                    description: `${announcements.length} announcements found.\n\n${announcements.map((a) => `**${a.name}** - ${DateTime.fromJSDate(a.announceAt).setZone(server.timezone).toFormat('D tt ZZZZ')}`).join('\n')}`
                }
            ]
        });

    }
}

export default AnnounceList;