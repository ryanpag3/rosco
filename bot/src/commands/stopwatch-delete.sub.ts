import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const StopwatchDelete: Command = {
    id: 'c4a50b3a-72ff-4e72-b1e4-ef03b6fdbd5e',
    name: 'stopwatch delete',
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name', true);
        try {
            await prisma.stopwatch.delete({
                where: {
                    name_serverId: {
                        name,
                        serverId: interaction.guild?.id as string
                    }
                }
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025')
                    throw new BotError(`Could not find stopwatch to delete.`);
            }
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: ':put_litter_in_its_place: Stopwatch deleted.',
                    description: `The stopwatch ${name} has been deleted.`
                }
            ]
        })
    }

}

export default StopwatchDelete;