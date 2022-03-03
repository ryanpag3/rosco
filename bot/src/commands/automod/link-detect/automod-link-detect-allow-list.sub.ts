import { Command } from '../../../../types/command';
import prisma from '../../../util/prisma';

const LinkDetectAllowList: Command = {
    id: '4084ecfe-150a-44d0-8027-21a59837b75a',
    name: 'link-detect allow-list',
    handler: async (interaction, user, server) => {
        const allowedLinks = await prisma.allowedLink.findMany({
            where: {
                serverId: server.id
            }
        });

        return interaction.reply({
            embeds: [
                {
                    title: ':link: Here are the approved links/patterns for this server.',
                    description: `${allowedLinks.map((a) => a.pattern).join('\n')}`
                }
            ]
        });
    }
};

export default LinkDetectAllowList;