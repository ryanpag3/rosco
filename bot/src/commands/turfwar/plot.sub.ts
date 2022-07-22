import randomColor from 'randomcolor';
import { Command } from '../../../types/command';
import prisma from '../../util/prisma';

const Plot: Command = {
    id: 'be64de1f-7286-4a30-b3f4-c70279897093',
    name: 'turfwar plot',
    description: 'Plot a square on the map.',
    handler: async (interaction, user, server) => {
        const color = interaction.options.getString('color') || randomColor();
        const X = interaction.options.getNumber('x-coord', true);
        const Y = interaction.options.getNumber('y-coord', true);

        try {
            // only one person can occupy a cell at a time
            await prisma.turfwarCoordinate.upsert({
                where: {
                    X_Y: {
                        X,
                        Y
                    }
                },
                create: {
                    color,
                    X,
                    Y,
                    createdById: user.id
                },
                update: {
                    color,
                    X,
                    Y,
                    createdById: user.id
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        description: `x: ${X} y: ${Y} color: ${color}`
                    }
                ]
            })
        } catch (e) {
            throw e;
        }
    }
}

export default Plot;