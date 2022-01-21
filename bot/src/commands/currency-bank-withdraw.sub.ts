import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const CurrencyBankWithdraw: Command = {
    id: '642acb8d-d62b-4af6-a702-a7f65015fb69',
    name: 'currency bank withdraw',
    handler: async (interaction, user, server) => {
        const amount = interaction.options.getInteger('amount', true);

        if (amount < 0)
            throw new BotError('Amount must be positive.');

        if (user.UserServer[0]?.bankCurrencyCount - amount < 0) {
            throw new BotError('You do not have enough currency to withdraw.');
        }

        const res = await prisma.userServer.update({
            where: {
                userId_serverId: {
                    userId: user.id, 
                    serverId: server?.id as string
                }
            },
            data: {
                currencyCount: {
                    increment: amount
                },
                bankCurrencyCount: {
                    decrement: amount
                }
            }
        }); 

        return interaction.reply({
            embeds: [
                {
                    title: ':bank: Your withdrawl was successful.',
                    description: `${interaction.member.user} withdrew ${amount} seeds from the bank.`
                }
            ]
        }) 
    }
}

export default CurrencyBankWithdraw;