import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const PollDelete: Command = {
    id: '6fdcae6a-ac48-4ec4-ac58-430f10f45af7',
    name: 'poll delete',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        
        try {
            await prisma.poll.delete({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string
                    }
                }
            })
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Could not find poll to delete');
            
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:v: Poll deleted.`,
                    description: `The poll **${name}** has been deleted.`
                }
            ]
        })
    }
};

export default PollDelete;