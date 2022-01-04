import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const KeywordList: Command = {
    id: '03ea918e-099f-4019-b70e-5edd777279fd',
    name: 'keyword list',
    handler: async (interaction, user) => {
        const keyword = interaction.options.getString('keyword') || undefined;
        const scoreName = interaction.options.getString('score-name') || undefined;

        let score;

        if (scoreName) {
            score = await prisma.score.findUnique({
                where: {
                    name_serverId: {
                        name: scoreName,
                        serverId: interaction.guild?.id as string
                    }
                }
            });

            if (!score)
                throw new BotError(`Cannot filter on score. Score does not exist.`);    
        }

        const keywords = await prisma.keyword.findMany({
            where: {
                keyword: {
                    contains: keyword
                },
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
                    description: `Here are the keywords you asked for\n\n__**keyword** - **score**__\n${keywords.map((k) => `_"${k.keyword}"_ - ${k.Score?.name}`).join('\n')}`
                }
            ]
        });
    }
};

export default KeywordList;