import { Command } from '../../types/command';
import commands from '../util/command-subcommand-map';
import prisma from '../util/prisma';

const PermissionList: Command = {
    id: '7d4c9938-cbe8-4e06-94e9-8a67da846102',
    name: 'permission list',
    handler: async (interaction, user) => {
        const permissions = await prisma.permission.findMany({
            where: {
                serverId: interaction.guild?.id
            },
            include: {
                User: true
            }
        });

        const mapped = [];

        for (const p of permissions) {
            const r = await interaction.guild?.roles.fetch(p.roleId);
            // @ts-ignore
            const command = Object.keys(commands).filter((commandName: string) => commands[commandName].id === p.commandId)[0];
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