import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import prisma from '../util/prisma';

const Me: Command = {
    id: '21ca1a1e-0e49-4b08-a83e-bf87f4e26fd2',
    name: 'me',
    description: 'Get information about the user.',
    options: [
        {
            name: 'announce',
            description: 'Set to "True" to post the results to the server.',
            type: ApplicationCommandOptionType.Boolean,
            default: false
        }
    ],
    handler: async (interaction, user, server) => {
        const announce = interaction.options.getBoolean('announce') || false;

        const u = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                UserServer: {
                    where: {
                        serverId: server?.id as string
                    }
                },
                Scoreboards: true,
                Scores: true,
                Keyword: true,
                Stopwatch: true
            }
        });

        const dUser = await interaction.client.users.fetch(user.discordId); 

        return interaction.reply({
            embeds: [
                {
                    title: `:sweat_smile: User info found`,
                    description: `Info found for user ${dUser}`,
                    fields: [
                        {
                            name: 'Scores',
                            value: u?.Scores.length.toString(),
                            inline: true
                        },
                        {
                            name: 'Scoreboards',
                            value: u?.Scoreboards.length.toString(),
                            inline: true
                        },
                        {
                            name: 'Keywords',
                            value: u?.Keyword.length.toString(),
                            inline: true
                        },
                        {
                            name: 'Stopwatches',
                            value: u?.Stopwatch.length.toString(),
                            inline: true
                        }
                    ]
                }
            ],
            ephemeral: !announce
        })
    }
};

export default Me;