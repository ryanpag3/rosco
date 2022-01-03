import { CommandInteraction } from 'discord.js';
import logger from './logger';
import prisma from './prisma'

export const addToHistory = async (userId: string, interaction: CommandInteraction, commandRaw: string) => {
    logger.debug(`[${interaction.user.tag}|${interaction.user.id}] ran command "/${interaction.commandName}${interaction.options.getSubcommand(false) ? ` ${interaction.options.getSubcommand(false)}` : '' }"`)
    logger.trace(`Full command:`, commandRaw);
    const res = await prisma.commandHistory.create({
        data: {
            userId,
            commandName: interaction.commandName,
            commandRaw
        }
    });
    return res;
}