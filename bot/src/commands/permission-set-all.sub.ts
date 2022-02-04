import { Command } from '../../types/command';
import logger from '../util/logger';
import prisma from '../util/prisma';
import Commands from '../util/command-subcommand-map';

const PermissionSetAll: Command = {
    id: '9b199c0d-3dea-40bc-96a4-ef34d59b5f04',
    name: 'permission set-all',
    handler: async (interaction, user, server) => {
        const role = interaction.options.getRole('role', true);

        await prisma.permission.deleteMany({
            where: {
                serverId: server?.id
            }
        });

        logger.debug(`deleted existing permissions for server`);

        await prisma.permission.createMany({
            data: Object.keys(Commands).map((key: string) => {
                return {
                    commandId: Commands[key].id,
                    roleId: role.id,
                    serverId: server?.id as string,
                    userId: user.id
                }
            })
        });

        return interaction.reply({
            embeds: [
                {
                    title: `:oncoming_police_car: All permissions are now set.`,
                    description: `All commands now require role **${role.name}**.`
                }
            ]
        });
    }
};

export default PermissionSetAll;