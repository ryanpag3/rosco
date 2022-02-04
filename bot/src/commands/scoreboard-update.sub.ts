import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const ScoreboardUpdate: Command = {
    id: 'babcf50b-c183-4b0e-b3ee-23640251459e',
    name: 'scoreboard update',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name') as string;
        const newName = interaction.options.getString('new-name') as string;
        const description = interaction.options.getString('description') as string;

        const scoreboard = await prisma.scoreboard.findUnique({
            where: {
                name_serverId: {
                    name,
                    serverId: server?.id as string
                }
            }
        });

        if (!scoreboard)
            throw new BotError(`Could not find scoreboard to update.`);

        try {

            let data: any = {};

            if (newName)
                data['name'] = newName;
            
            if (description)
                data['description'] = description;
            

            await prisma.scoreboard.update({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string 
                    }
                },
                data
            })

            return interaction.reply({
                embeds: [
                    {
                        title: ':put_litter_in_its_place: Scoreboard has been updated.',
                        description: `The scoreboard **${newName || name}** has been updated with the following fields`,
                        fields: Object.keys(data).map((k) => {
                            return {
                                name: k,
                                value: data[k] as string
                            }
                        })
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

export default ScoreboardUpdate;