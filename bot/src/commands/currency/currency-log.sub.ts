import { CurrencyHistoryLog } from '@prisma/client';
import { APIInteractionDataResolvedChannel } from 'discord-api-types';
import { CacheType, CommandInteraction, GuildChannel, ThreadChannel } from 'discord.js';
import { Command } from '../../../types/command';
import prisma from '../../util/prisma';

const CurrencyLog: Command = {
    id: 'b951354e-597e-445d-9d33-83c4787aeda2',
    name: 'currency log',
    handler: async (interaction, user) => {
        const channel = interaction.options.getChannel('channel');
        const isActive = interaction.options.getBoolean('active');

        if (channel) {
            await handleChannelUpdate(interaction, channel as GuildChannel);
        } else if (isActive !== null) {
            await handleIsActiveUpdate(interaction, isActive);
        } else {
            const currencyHistoryLogs = await prisma.currencyHistoryLog.findMany({
                where: {
                    Server: {
                        discordId: interaction.guild?.id as string
                    }
                },
                include: {
                    Receiver: true,
                    Sender: true,
                    Server: true,
                    currencyRule: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 15
            });

            return interaction.reply({
                embeds: [
                    {
                        description: `${currencyHistoryLogs.map(c => `${interaction.client.users.cache.get(c.Receiver.discordId)} | ${c.currencyRule?.action} | ${c.currencyRule?.amount}`).join('\n')}`
                    }
                ],
                allowedMentions: {
                    roles: [],
                    users: []
                }
            })
        }
    }
};

const handleChannelUpdate = async (interaction: CommandInteraction<CacheType>,
    channel: GuildChannel) => {
    await prisma.server.update({
        where: {
            discordId: interaction.guild?.id
        },
        data: {
            currencyHistoryChannelId: channel?.id
        }
    });

    await interaction.reply({
        embeds: [
            {
                title: `:money_with_wings: Currency log channel has been assigned.`,
                description: `${channel} will log all currency transactions and income.`
            }
        ]
    });
}

const handleIsActiveUpdate = async (interaction: CommandInteraction<CacheType>,
    isActive: boolean | null) => {
    await prisma.server.update({
        where: {
            discordId: interaction.guild?.id
        },
        data: {
            currencyHistoryChannelActive: isActive
        }
    });

    await interaction.reply({
        embeds: [
            {
                title: `:money_with_wings: Currency log channel has been assigned.`,
                description: `Currency logging has been ${isActive ? 'enabled' : 'disabled'}.`
            }
        ]
    });
}

export default CurrencyLog;