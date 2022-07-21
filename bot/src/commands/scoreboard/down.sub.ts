import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const ScoreboardDown: Command = {
    id: 'b4f8e079-7507-44f4-8f4e-f7c0d646dae5',
    name: 'scoreboard down',
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
                        decrement: amount
                    }
                }
            });
        } catch (e) {
           throw new BotError(`An error occured while updating scoreboard scores.`); 
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:arrow_up: Scoreboard scores decreased.`,
                    description: `All scores in scoreboard **${name}** have been decreased.\n\nUse \`/score list scoreboard: <name>\` to view them.`
                }
            ]
        })
    }
};

export default ScoreboardDown;