import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const ScoreboardScoreAdd: Command = {
    name: 'score-add',
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name') as string;
        const scoreName = interaction.options.getString('score-name') as string;

        try {
            await prisma.scoreboard.update({
                where: {
                    name_serverId: {
                        name,
                        serverId: interaction.guild?.id as string
                    }
                },
                data: {
                    Scores: {
                        set: [{
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
                    title: `:hearts: Score has been added.`,
                    description: `Score **${scoreName}** has been added to scoreboard **${name}**.`
                }]
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025')
                    throw new BotError(`A score was not found in the scores list. Please verify score exists.`);

                if (e.code === 'P2002')
                    throw new BotError(`A scoreboard already exists with that name on this server.`);
            }
            throw e;
        }
    }
};

export default ScoreboardScoreAdd;