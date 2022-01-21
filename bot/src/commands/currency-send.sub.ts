import { Server } from '@prisma/client';
import { GuildMember } from 'discord.js';
import { Command } from '../../types/command';
import * as UserService from '../service/user';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const CurrencySend: Command = {
    id: '3f7783af-18ec-45cb-9471-2bf594e8d409',
    name: 'currency send',
    handler: async (interaction, user, server) => {
        const recipient = interaction.options.getUser('to', true);
        const amount = interaction.options.getInteger('amount', true);

        const recipientInDb = await UserService.initUser({ user: recipient } as GuildMember, server as Server);

        // @ts-ignore
        if (user.UserServer[0].currencyCount - amount < 0)
            throw new BotError('You don\'t have enough seeds to send.');

        await prisma.$transaction([
            prisma.userServer.update({
                where: {
                    userId_serverId: {
                        userId: user.id,
                        serverId: server?.id as string
                    }
                },
                data: {
                    currencyCount: {
                        decrement: amount
                    }
                }
            }),
            prisma.userServer.update({
                where: {
                    userId_serverId: {
                        userId: recipientInDb.id,
                        serverId: server?.id as string
                    }
                },
                data: {
                    currencyCount: {
                        increment: amount
                    }
                }
            })
        ]);

        const senderDiscord = await interaction.client.users.fetch(user.discordId);

        return interaction.reply({
            embeds: [
                {
                    title: ':mailbox_with_mail: Currency was sent!',
                    // @ts-ignore
                    description: `${senderDiscord} sent ${amount} seeds to ${recipient}\n\n${senderDiscord} new total ${user.UserServer[0].currencyCount - amount - 1}\n---\n${recipient} new total ${recipientInDb.UserServer[0].currencyCount + amount}`
                }
            ]
        });
    }
};

export default CurrencySend;