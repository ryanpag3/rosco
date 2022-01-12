import prisma from '../util/prisma'

export const initializeServer = async (discordId: string) => {
    return prisma.server.upsert({
        where: {
            discordId
        },
        update: {
            
        },
        create: {
            discordId
        }
    });
}