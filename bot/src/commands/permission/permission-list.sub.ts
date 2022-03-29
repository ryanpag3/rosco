import { Command } from '../../../types/command';
import COMMANDS from '../../recursive-commands';
import prisma from '../../util/prisma';

const PermissionList: Command = {
    id: '7d4c9938-cbe8-4e06-94e9-8a67da846102',
    name: 'permission list',
    handler: async (interaction, user, server) => {
        const permissions = await prisma.permission.findMany({
            where: {
                serverId: server?.id
            },
            include: {
                User: true
            }
        });

        const mapped = [];

        for (const p of permissions) {
            const r = await interaction.guild?.roles.fetch(p.roleId);
            // @ts-ignore
            const command = Object.keys(COMMANDS).filter((commandName: string) => COMMANDS[commandName].id === p.commandId)[0];
            mapped.push({
                role: r?.name,
                command
            });
        }

        return interaction.reply({
            embeds: [
                {
                    title: `Permissions`,
                    description: `**__Role - Command__**\n${mapped.map(m => `${m.role} - _${m.command}_`).join('\n')}`
                }
            ]
        })
    }
};

export default PermissionList;