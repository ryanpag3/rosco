import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const ScoreboardCreate: Command = {
    id: '9e55b0aa-c8c2-4d0d-8f97-12794be6ef3d',
    name: 'scoreboard create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name') as string;
        const description = interaction.options.getString('description');
        const scores = interaction.options.getString('scores')?.split(',') || [];

        try {
            const scoreboard = await prisma.scoreboard.create({
                data: {
                    name,
                    description,
                    serverId: server?.id as string,
                    channelId: interaction.channel?.id as string,
                    userId: user.id
                }
            });

            await prisma.scoreboard.update({
                where: {
                    id: scoreboard.id
                },
                data: {
                    Scores: {
                        set: scores.map((s) => {
                            return {
                                name_serverId: {
                                    name: s,
                                    serverId: server?.id as string
                                }
                            }
                        })
                    }
                }
            });
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === 'P2025')
                    throw new BotError(`A score was not found in the scores list. Please verify all scores exist.`);
                
                if (e.code === 'P2002')
                    throw new BotError(`A scoreboard already exists with that name on this server.`);
            }
            throw e;
        }

        const fields = [
            {
                name: 'name',
                value: name
            },
            {
                name: 'description',
                value: description || 'No description.'
            },
            {
                name: 'scores',
                value: scores.join(', ')
            }
        ];

        if (scores.length === 0)
            fields.pop();

        await interaction.reply({
            embeds: [
                {
                    title: `Scoreboard has been created.`,
                    fields
                }
            ]
        })

    }
};

export default ScoreboardCreate;