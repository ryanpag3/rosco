import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from 'src/../../types/command';
import BotError from '../../../util/bot-error';
import prisma from '../../../util/prisma';
import PrismaErrorCode from '../../../util/prisma-error-code';

const IgnoredRoleRemove: Command = {
    id: 'e7c1bfc8-7e58-436f-a571-d5cbd3d08ea9',
    name: 'ignored-role remove',
    handler: async (interaction, user, server) => {
        const role = interaction.options.getRole('role', true);

        try {
            await prisma.serverAutoModIgnoredRole.delete({
                where: {
                    serverId_roleId: {
                        serverId: server.id,
                        roleId: role.id
                    }
                }
            });
        } catch(e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('That role was not being ignored by AutoMod. Did you mean to run `/automod ignore-role add`?');
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:hand_splayed: A role has been removed to the AutoMod ignore list.`,
                    description: `**${role}** is now being tracked by AutoMod.`
                }
            ],
            // @ts-ignore
            allowedMentions: []
        });
    }
};

export default IgnoredRoleRemove;