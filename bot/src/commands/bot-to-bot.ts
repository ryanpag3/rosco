import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from 'src/../../types/command';
import prisma from '../util/prisma';

const BotToBot: Command = {
    id: 'c760cc15-7192-43f1-a3a5-0efa2d7d5573',
    name: 'bot-to-bot',
    description: `Configure bot-to-bot communication for server.`,
    options: [
        {
            name: 'enable',
            description: 'Enable bot-to-bot communication for this server.',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'disable',
            description: 'Disable bot-to-bot communication for this server.',
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    handler: async (interaction, user, server) => {
        const subcommand = interaction.options.getSubcommand();
        const isEnabled = subcommand === 'enable';

        try {
            await prisma.server.update({
                where: {
                    id: server?.id as string
                },
                data: {
                    botToBotMessagesEnabled: isEnabled
                }
            });
        } catch (e) {
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    description: isEnabled ? 
                        `:robot: **Rosco** will now listen to messages from other bots on this server.` :
                        `:robot: **Rosco** is no longer listening to messages from other bots on this server.`
                }
            ]
        })
    }
};

export default BotToBot;