import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import Score from '../score/score';

const ScoreboardScoreRemove: Command = {
    id: 'd21f0939-021b-4787-85d9-f226fa26166a',
    name: 'scoreboard remove-score',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name') as string;
        const scoreName = interaction.options.getString('score-name') as string;

        try {
            const scoreboard = await prisma.scoreboard.findUnique({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string
                    }
                },
                include: {
                    ScoreboardScore: {
                        include: {
                            Score: true
                        }
                    }
                }
            });

            const includesScore = scoreboard?.ScoreboardScore.filter((s) => s.Score.name === scoreName).length === 1;

            if (!includesScore)
                throw new BotError(`Score is not assigned to that scoreboard.`);

            await prisma.scoreboardScore.delete({
                where: {
                    scoreboardId_scoreId: {
                        scoreboardId: scoreboard.id,
                        scoreId: scoreboard?.ScoreboardScore.filter((s) => s.Score.name === scoreName)[0]?.Score.id as string
                    }
                }
            });

            return interaction.reply({
                embeds: [{
                    title: `:hearts: Score has been removed from scoreboard.`,
                    description: `Score **${scoreName}** has been removed from scoreboard **${name}**.`
                }]
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025')
                    throw new BotError(`A score was not found in the scores list. Please verify score exists.`);
            }
            throw e;
        }
    }
};

export default ScoreboardScoreRemove;