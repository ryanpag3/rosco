import { Command } from '../../../types/command';
import prisma from '../../util/prisma';

const PermissionUnsetAll: Command = {
    id: '6d8707cb-2489-43ec-b686-60a9ce9beff5',
    name: 'permission unset-all',
    handler: async (interaction, user, server) => {
        await prisma.permission.deleteMany({
            where: {
                serverId: server?.id
            }
        });

        return interaction.reply({
            embeds: [
                {
                    title: `:oncoming_police_car: All permissions are now unset.`,
                    description: `All commands now do not require a role.`
                }
            ]
        });
    }
};

export default PermissionUnsetAll;