import { CommandInteraction } from 'discord.js';
import COMMANDS from '../commands';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import * as ServerService from '../service/server';
import * as CommandHistory from '../util/command-history';
import { userHasPermission } from '../service/permission';
import prisma from '../util/prisma';
import { CurrencyAction, handleCurrencyEvent } from '../service/currency';

export default async function(interaction: CommandInteraction) {
    try {
        if (!interaction.isCommand())
            return;
    
        await handleCurrencyEvent(CurrencyAction.COMMAND, interaction);

        const server = await ServerService.initializeServer(interaction.guild);

        const user = await prisma.user.upsert({
            where: {
                discordId: interaction.user?.id
            },
            update: {},
            create: {
                discordId: interaction.user?.id,
                UserServer: {
                    create: [
                        {
                            currencyCount: 0,
                            serverId: server?.id as string
                        }
                    ]
                }
            }
        });

        if (!await userHasPermission(interaction, user)) {
            return interaction.reply({
                embeds: [
                    {
                        title: `:lock: Permission denied.`,
                        description: `You do not have permission to run that command.`
                    }
                ]
            })
        }

        await CommandHistory.addToHistory(user.id, interaction, JSON.stringify(interaction.toJSON(), (key, value) => typeof value === 'bigint' ? value.toString() : value, 4));

        const { handler } = COMMANDS[interaction.commandName];

        if (!handler) {
            return interaction.reply('command not found.');
        }

        await handler(interaction, user);
    } catch (e) {
        logger.error(`An error occured while receiving interaction.`, e);

        const extraInfo = `\n\n_Need help?_\n - Run \`/help ${interaction.commandName}\` \n - [Join the support server](https://discord.gg/KwJUfbt5Wv)`;

        if (!(e instanceof BotError)) {
            interaction.reply({
                embeds: [
                    {
                        description: `An internal server error occured. Please contact bot administrator.${extraInfo}`
                    }
                ]
            });
        } else {
            interaction.reply({
                embeds: [
                    {
                        title: `:cry: Whoops, an error occured.`,
                        description: `${e.message}${extraInfo}`
                    }
                ]
            });
        }

        if (process.env.NODE_ENV === 'test')
            throw e;
    }

}