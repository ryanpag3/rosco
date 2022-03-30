import { Guild } from 'discord.js';
import prisma from '../util/prisma'

export const initializeServer = async (guild: Guild|null) => {
    if (!guild)
        return;
        
    return prisma.server.upsert({
        where: {
            discordId: guild?.id
        },
        update: {
            
        },
        create: {
            discordId: guild?.id,
        },
        include: {
            ServerWelcomeMessage: true,
            ServerAutoModIgnoredRole: true
        }
    });
}