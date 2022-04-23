
import { Permission } from '@prisma/client';
import { CommandInteraction, CacheType } from 'discord.js';
import { Command } from 'src/../../types/command';
import COMMANDS from '../../recursive-commands';
import prisma from '../../util/prisma';

const PermissionList: Command = {
    id: 'f25e56b6-f166-40ba-b9fb-3a5105a81eeb',
    name: 'permission list',
    handler: async (interaction, user, server) => {
        const permissions = await prisma.permission.findMany({
            where: {
                serverId: server.id
            }
        });

        const p = mapRolesToCommands(interaction, permissions);

        return interaction.reply({
            embeds: [
                {
                    title: `Permissions`,
                    description: `**Command** - **Allowed Roles**\n${Object.values(p).map((perm: any) => {
                        const [ command ]: any = Object.values(COMMANDS)
                                                       .filter((c: any) => c.id === perm.commandId);
                        return `**${command.name}** - ${perm.roles.map((r: any) => r.name).join(', ')}`; 
                    })
                    .sort().join('\n')}`
                }
            ]
        });
    }
};

const mapRolesToCommands = (interaction: CommandInteraction<CacheType>, permissions: Permission[]) => {
    const mapped: any = {};

    const getRole = (roleId: string) => interaction.guild?.roles.cache.find((r) => r.id === roleId)?.toJSON();
    
    for (const permission of permissions) {
        if (mapped[permission.commandId]) {
            mapped[permission.commandId].roles.push(
                getRole(permission.roleId)
            );
        } else {
            mapped[permission.commandId] = {
                commandId: permission.commandId,
                roles: [ getRole(permission.roleId) ]
            };

            delete mapped[permission.commandId].id;
            delete mapped[permission.commandId].roleId;
        }
    }

    return mapped;
}

export default PermissionList;