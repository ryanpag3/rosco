import { CommandInteraction } from 'discord.js';
import COMMANDS from '../commands';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import * as UserService from '../service/user';
import * as ServerService from '../service/server';
import * as CommandHistory from '../util/command-history';
import { userHasPermission } from '../service/permission';

export default async function(interaction: CommandInteraction) {
    try {
        if (!interaction.isCommand())
            return;

        await ServerService.initializeServer(interaction.guild?.id as string);

        const user = await UserService.createIfNotExist(interaction.user.id);

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