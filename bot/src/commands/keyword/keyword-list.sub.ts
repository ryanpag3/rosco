import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const KeywordList: Command = {
    id: '03ea918e-099f-4019-b70e-5edd777279fd',
    name: 'keyword list',
    handler: async (interaction, user, server) => {
        const keyword = interaction.options.getString('keyword') || undefined;
        const scoreName = interaction.options.getString('score-name') || undefined;

        let score;
        if (scoreName) {
            try {
                score = await prisma.score.findUnique({
                    where: {
                        name_serverId: {
                            name: scoreName,
                            serverId: server?.id as string
                        }
                    }
                });
            } catch (e) {
                if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                    throw new BotError('Could not find score with that name.');
                throw e;
            }
        }

        const keywords = await prisma.keyword.findMany({
            where: {
                word: {
                    contains: keyword
                },
                serverId: server?.id,
                scoreId: score?.id
            },
            include: {
                Score: true
            }
        });

        return interaction.reply({
            embeds: [
                {
                    title: `:newspaper: Keywords`,
                    description: `Here are the keywords you asked for\n\n__**keyword** - **score**__\n${keywords.map((k) => `_"${k.word}"_ - ${k.Score?.name}`).join('\n')}`
                }
            ]
        });
    }
};

export default KeywordList;