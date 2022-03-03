import { Command } from '../../../types/command';
import prisma from '../../util/prisma';
import * as UserService from '../../service/user';
import { GuildMember } from 'discord.js';
import { Server } from '@prisma/client';
import BotError from '../../util/bot-error';

const CurrencyGrant: Command = {
    id: 'f296252c-81a6-4a92-9612-3d7286b09500',
    name: 'currency grant',
    handler: async (interaction, sendingUser, server) => {
        const discordUser = interaction.options.getUser('user', true);
        const amount = interaction.options.getInteger('amount') || 1;

        if (amount <= 0) {
            throw new BotError('Amount must be greater than 0.');
        }

        let sendToUser = await prisma.user.findUnique({
            where: {
                discordId: discordUser.id
            }
        });

        if (!sendToUser)
            sendToUser = await UserService.initUser({user: discordUser} as GuildMember, server as Server);

        await prisma.userServer.update({
            where: {
                userId_serverId: {
                    userId: sendToUser.id,
                    serverId: server?.id as string
                }
            },
            data: {
                currencyCount: {
                    increment: amount
                }
            }
        });

        const dSendUser = await interaction.client.users.fetch(sendingUser.discordId);

        return interaction.reply({
            embeds: [
                {
                    title: `:money_mouth: Currency has been granted.`,
                    description: `${dSendUser} has granted ${discordUser} ${amount} seeds.`
                }
            ]
        })
    }
};

export default CurrencyGrant;