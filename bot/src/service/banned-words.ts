import { Server, User } from '@prisma/client';
import { CacheType, CommandInteraction } from 'discord.js';
import logger from '../util/logger';
import prisma from '../util/prisma';

export const toggleBannedWordsRule = async (interaction: CommandInteraction<CacheType>, user: User, server: Server, isEnabled: boolean) => {

    logger.debug(`setting banned words rule to ${isEnabled}`);

    await prisma.server.update({
        where: {
            id: server.id
        },
        data: {
            autoModBannedWordsEnabled: isEnabled
        }
    });

    return sendAutoModeToggledMessage(interaction, 'Banned Words', isEnabled);
}

const sendAutoModeToggledMessage = async (interaction: CommandInteraction<CacheType>, feature: string, isEnabled: boolean) => {
    return interaction.reply({
        embeds: [
            {
                title: 'AutoMod',
                description: `_${feature}_ rule has been **${isEnabled ? 'enabled' : 'disabled'}.**`
            }
        ]
    });
}