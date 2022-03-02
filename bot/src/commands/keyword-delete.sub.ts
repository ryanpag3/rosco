import { KeywordAction, Prisma } from '@prisma/client';
import { Command } from '../../types/command';
import KeywordCache from '../service/keyword-cache';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const KeywordDelete: Command = {
    id: 'f10df570-b711-41bc-a083-0b2465304b1e',
    name: 'keyword delete',
    handler: async (interaction, user, server) => {
        const word = interaction.options.getString('keyword', true);
        const scoreName = interaction.options.getString('score-name', true);

        const score = await prisma.score.findUnique({
            where: {
                name_serverId: {
                    name: scoreName,
                    serverId: server?.id as string
                }
            }
        });

        if (!score)
            throw new BotError(`Score does not exist. Cannot delete keyword.`);

        const keywordRecord = await prisma.keyword.delete({
            where: {
                word_scoreId_serverId: {
                    word,
                    scoreId: score.id,
                    serverId: server?.id as string,
                }
            }
        });

        await KeywordCache.deleteRecord(server.id, keywordRecord.id);

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