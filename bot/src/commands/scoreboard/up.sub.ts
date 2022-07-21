import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const ScoreboardUp: Command = {
    id: '8dde714d-9d33-4f79-8ed8-4942a9eb6185',
    name: 'scoreboard up',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const amount = interaction.options.getNumber('amount') || 1;
 
        try {
            await prisma.scoreboard.findUnique({
                where: {
                    name_serverId: {
                        name,
                        serverId: server.id
                    }
                }
            });
        } catch(e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError(`Scoreboard with name **${name}** does not exist.`);

            throw e;
        }

        try {
            await prisma.score.updateMany({
                where: {
                    ScoreboardScore: {
                        some: {
                            Scoreboard: {
                                name
                            }
                        }
                    }
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            });
        } catch (e) {
           throw new BotError(`An error occured while updating scoreboard scores.`); 
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:arrow_up: Scoreboard scores increased.`,
                    description: `All scores in scoreboard **${name}** have been increased.\n\nUse \`/score list scoreboard: <name>\` to view them.`
                }
            ]
        })
    }
};

export default ScoreboardUp;