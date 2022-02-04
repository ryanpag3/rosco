import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const AnnounceDelete: Command = {
    id: '3165ee15-7de8-4d80-a571-c88b60c90f8b',
    name: 'announce delete',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);

        try {
            await prisma.announcement.delete({
                where: {
                    serverId_name: {
                        name,
                        serverId: server?.id as string
                    }
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Announcement was not found to delete.');
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: ':loudspeaker: Announcement was deleted.',
                    description: `The announcement **${name}** has been deleted.`
                }
            ]
        });
    }
};

export default AnnounceDelete;