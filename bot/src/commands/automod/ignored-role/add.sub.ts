import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from 'src/../../types/command';
import BotError from '../../../util/bot-error';
import prisma from '../../../util/prisma';
import PrismaErrorCode from '../../../util/prisma-error-code';

const IgnoredRoleAdd: Command = {
    id: '22c53ac8-8b2f-4d00-8b76-fa45d6831e78',
    name: 'ignored-role add',
    handler: async (interaction, user, server) => {
        const role = interaction.options.getRole('role', true);

        try {
            await prisma.serverAutoModIgnoredRole.create({
                data: {
                    serverId: server.id,
                    roleId: role.id
                }
            });
        } catch(e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_CONSTRAINT)
                throw new BotError('Role is already being ignored by AutoMod.');
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:hand_splayed: A role has been added to the AutoMod ignore list.`,
                    description: `**${role}** will no longer be subject to the rule of law (AutoMod).`
                }
            ],
            // @ts-ignore
            allowedMentions: []
        });
    }
};

export default IgnoredRoleAdd;