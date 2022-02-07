import { Server, User } from '@prisma/client';
import { CacheType, CommandInteraction } from 'discord.js';

export const toggleBannedWordsRule = (interaction: CommandInteraction<CacheType>, user: User, server: Server, isEnabled: boolean) => {
    const name = interaction.options.getString('name');

    
}