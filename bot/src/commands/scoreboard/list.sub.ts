import { InteractionReplyOptions, MessageEmbed } from 'discord.js';
import { Command } from '../../../types/command';
import prisma from '../../util/prisma';

const ScoreboardList: Command = {
    id: '58ea422a-3953-4fb1-9a5f-b8c8a91f3392',
    name: 'scoreboard list',
    handler: async (interaction, user, server) => {
        const page = interaction.options.getInteger('page') || 1;
        const amountPerPage = 10;

        const count = await prisma.scoreboard.count({
            where: {
                serverId: server.id
            }
        });

        const scoreboards = await prisma.scoreboard.findMany({
            where: {
                serverId: server.id
            },
            take: amountPerPage,
            skip: amountPerPage * (page - 1),
            include: {
                ScoreboardScore: true
            }
        });

        if (scoreboards.length === 0) {
            return interaction.reply({
                embeds: [
                    {
                        description: `No scoreboards were found in this server. \n\n You can create one with \`/scoreboard create\``
                    }
                ]
            })
        }

        return interaction.reply({
            embeds: [
                {
                    description: `Here are the scoreboards in your server. \n\nname - scores\n${scoreboards.map((s) => {
                        return `**${s.name}** - ${s.ScoreboardScore.length}`;
                    }).join('\n')}\n\n Page ${page} of ${Math.floor(count / amountPerPage) || 1}`  
                } as MessageEmbed
            ],
            ephemeral: true
        } as InteractionReplyOptions)
    }
};

export default ScoreboardList;