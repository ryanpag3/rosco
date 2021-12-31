import prisma from '../util/prisma'


export const createIfNotExist = async (discordId: string) => {
    const user = await prisma.user.upsert({
        where: {
            discordId
        },
        update: {

        },
        create: {
            discordId
        }
    });
    
    return user;
}