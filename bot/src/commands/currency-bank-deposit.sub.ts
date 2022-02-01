import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const CurrencyBankDeposit: Command = {
    id: 'a2917bc1-7492-4e81-b63c-422649516af6',
    name: 'currency bank deposit',
    handler: async (interaction, user, server) => {
        const amount = interaction.options.getInteger('amount', true);

        if (amount < 0)
            throw new BotError('Amount must be positive.');

        if (user.UserServer[0]?.currencyCount - amount < 0) {
            throw new BotError('You do not have enough currency to deposit.');
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
                    decrement: amount
                },
                bankCurrencyCount: {
                    increment: amount
                }
            }
        }); 

        return interaction.reply({
            embeds: [
                {
                    title: ':bank: Your deposit was successful.',
                    description: `${interaction.member?.user} deposited ${amount} seeds into the bank.`
                }
            ],
            ephemeral: true
        })
    }
}

export default CurrencyBankDeposit;