import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const ScoreboardScoreRemove: Command = {
    id: 'd21f0939-021b-4787-85d9-f226fa26166a',
    name: 'scoreboard remove-score',
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name') as string;
        const scoreName = interaction.options.getString('score-name') as string;

        try {
            const scoreboard = await prisma.scoreboard.findUnique({
                where: {
                    name_serverId: {
                        name,
                        serverId: interaction.guild?.id as string
                    }
                },
                include: {
                    Scores: true
                }
            });

            const includesScore = scoreboard?.Scores.filter((s) => s.name === scoreName).length === 1;

            if (!includesScore)
                throw new BotError(`Score is not assigned to that scoreboard.`);

            await prisma.scoreboard.update({
                where: {
                    name_serverId: {
                        name,
                        serverId: interaction.guild?.id as string
                    }
                },
                data: {
                    Scores: {
                        disconnect: [{
                            name_serverId: {
                                name: scoreName,
                                serverId: interaction.guild?.id as string
                            }
                        }]
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