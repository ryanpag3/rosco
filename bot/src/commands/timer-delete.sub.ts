import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const TimerDelete: Command = {
    id: 'abaa88e0-9945-44dd-835a-c3cb6b72dad2',
    name: 'timer delete',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);

        try {
            await prisma.timer.delete({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string
                    }
                }
            })
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Timer was not found to delete.');
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: ':hourglass: Timer was deleted.',
                    description: `The timer **${name}** has been deleted.`
                }
            ]
        });
    }
};

export default TimerDelete;