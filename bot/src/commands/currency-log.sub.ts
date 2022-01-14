import { Command } from '../../types/command';
import prisma from '../util/prisma';

const CurrencyLog: Command = {
    id: 'b951354e-597e-445d-9d33-83c4787aeda2',
    name: 'currency log',
    handler: async (interaction, user) => {
        const channel = interaction.options.getChannel('channel');
        
        if (channel) {
            await prisma.server.update({
                where: {
                    discordId: interaction.guild?.id
                },
                data: {
                    currencyHistoryChannelId: channel.id
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:money_with_wings: Currency log channel has been assigned.`,
                        description: `${channel} will log all currency transactions and income.`
                    }
                ]
            });
        }

    }
};

export default CurrencyLog;