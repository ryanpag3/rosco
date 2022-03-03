import { Command } from '../../../../types/command';
import prisma from '../../../util/prisma';

const CapslockDetectConfig: Command = {
    id: 'cd3d208e-817d-41a1-a06c-54b9768b063d',
    name: 'capslock-detect config',
    handler: async (interaction, user, server) => {
        const length = interaction.options.getInteger('length') || 12;

        await prisma.server.update({
            where: {
                id: server.id
            },
            data: {
               autoModCapslockDetectLength: length 
            }
        });

        return interaction.reply({
            embeds: [
                {
                    title: `:gear: Capslock Detection Configuration Updated`,
                    fields: [
                        {
                            name: 'length',
                            value: length?.toString() || server.autoModCapslockDetectLength.toString()
                        }
                    ]
                }
            ]
        })
    }
};

export default CapslockDetectConfig;