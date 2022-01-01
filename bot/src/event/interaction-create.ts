import { Interaction } from 'discord.js';
import COMMANDS from '../commands';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import * as UserService from '../service/user';
import * as CommandHistory from '../util/command-history';

export default async function(interaction: Interaction) {
    try {
        if (!interaction.isCommand())
            return;


        const user = await UserService.createIfNotExist(interaction.user.id);

        await CommandHistory.addToHistory(user.id, interaction.commandName, JSON.stringify(interaction.toJSON(), (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value, 4
        ));

        const { handler } = COMMANDS[interaction.commandName];

        if (!handler) {
            return interaction.reply('command not found.');
        }

        await handler(interaction, user);
    } catch (e) {
        logger.error(`An error occured while receiving interaction.`, e);

        if (!(e instanceof BotError)) {
            interaction.channel?.send({
                embeds: [
                    {
                        description: `An internal server error occured. Please contact bot administrator.`
                    }
                ]
            });
        } else {
            interaction.channel?.send({
                embeds: [
                    {
                        title: `:stop_sign: An error occured.`,
                        description: `${e.message}`
                    }
                ]
            });
        }


        if (process.env.NODE_ENV === 'test')
            throw e;
    }

}