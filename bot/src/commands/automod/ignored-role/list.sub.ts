import { Command } from 'src/../../types/command';
import logger from '../../../util/logger';
import prisma from '../../../util/prisma';

const IgnoredRoleList: Command = {
    id: '90350a39-a8e7-4d84-ad1b-c29921a0a92c',
    name: 'ignored-role list',
    handler: async (interaction, user, server) => {

        const roles = await prisma.serverAutoModIgnoredRole.findMany({
            where: {
                serverId: server.id
            }
        });

        const names = [];
        for (const role of roles) {
            const name = await interaction.guild?.roles.fetch(role.roleId as any);
            names.push(name);
        }

        return interaction.reply({
            embeds: [
                {
                    title: `Here are the current roles AutoMod ignores`,
                    description: `${names.join('\n')}`
                }
            ],
            // @ts-ignore
            allowedMentions: []
        });
    }
};

export default IgnoredRoleList;