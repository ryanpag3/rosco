import { Command } from '../../types/command';
import prisma from '../util/prisma';

const StopwatchDelete: Command = {
    id: 'c4a50b3a-72ff-4e72-b1e4-ef03b6fdbd5e',
    name: 'delete',
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name', true);
        
        await prisma.stopwatch.delete({
            where: {
                name_serverId: {
                    name,
                    serverId: interaction.guild?.id as string
                }
            }
        });

        return interaction.reply({
            embeds: [
                {
                    
                }
            ]
        })
    }

}

export default StopwatchDelete;