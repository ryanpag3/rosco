import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import prisma from '../util/prisma';

const ScoreboardDelete: Command = {
    id: '1adb16b7-d904-47bb-b4e3-5ac93b2cc491',
    name: 'delete',
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name');

        try {
            await prisma.scoreboard.delete({
                where: {
                    name_serverId: {
                        name: name as string,
                        serverId: interaction.guild?.id as string
                    }
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: ':put_litter_in_its_place: Scoreboard has been deleted.',
                        description: `The scoreboard **${name}** has been deleted.\nThe scores previously assigned to the scoreboard still exist.`
                    }
                ]
            })
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025')
                    throw new BotError(`Scoreboard does not exist to delete.`);
            }
            throw e;
        }
    }
};

export default ScoreboardDelete;