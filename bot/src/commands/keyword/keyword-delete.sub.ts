import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import PrismaErrorCode from '../../util/prisma-error-code';
import KeywordCache from '../../service/keyword-cache';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import { KeywordAction } from '@prisma/client';

const KeywordDelete: Command = {
    id: 'f10df570-b711-41bc-a083-0b2465304b1e',
    name: 'keyword delete',
    handler: async (interaction, user, server) => {
        const word = interaction.options.getString('keyword', true);
        const scoreName = interaction.options.getString('score-name', true);
        const action = interaction.options.getString('action');
        const channel = interaction.options.getChannel('channel');
        const filterOnUser = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');


        let inDbUser;
        try {
            if (filterOnUser) {
                inDbUser = await prisma.user.findUnique({
                    where: {
                        discordId: user.id
                    }
                });
            }
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Could not find user to filter on.');
        }

        try {
            if (!server)
                throw new Error(`Server instance not instantiated. Keyword functionality has been disabled.`);


            const score = await prisma.score.findUnique({
                where: {
                    name_serverId: {
                        name: scoreName,
                        serverId: server?.id as string
                    }
                }
            });
    
            const keywordRecord = await prisma.keyword.findFirst({
                where: {
                    word,
                    scoreId: score?.id as string,
                    serverId: server?.id as string,
                    channelId: channel?.id,
                    action: action as KeywordAction || undefined,
                    userId: inDbUser?.id,
                    roleId: role?.id
                },
                rejectOnNotFound: false
            }); 

            if (!keywordRecord)
                throw new BotError(`The keyword does not exist.`); 

            await prisma.keyword.delete({
                where: {
                    id: keywordRecord.id
                }
            });
    
            await KeywordCache.deleteRecord(server.id, keywordRecord.id);
        } catch (e) {                
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:bookmark: Keyword deleted successfully.`,
                    description: `The keyword **${word}** will no longer trigger any score functionality.`
                }
            ]
        });
    }
};

export default KeywordDelete;