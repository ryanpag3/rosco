import { Interaction } from 'discord.js';
import COMMANDS from '../commands';
import BotError from '../util/bot-error';
import logger from '../util/logger';

export default async function(interaction: Interaction, isTestCase: boolean = false) {
    try {
        if (!interaction.isCommand())
            return;

        logger.debug(`command [${interaction.commandName}] issued.`);

        const { handler } = COMMANDS[interaction.commandName];

        if (!handler) {
            return interaction.reply('command not found.');
        }

        await handler(interaction);
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


        if (isTestCase)
            throw e;
    }

}