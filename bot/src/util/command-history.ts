import logger from './logger';
import prisma from './prisma'

export const addToHistory = async (userId: string, commandName: string, commandRaw: string) => {
    logger.debug(`[${userId}] ran [${commandName}].`)
    logger.trace(`Full command:`, commandRaw);
    const res = await prisma.commandHistory.create({
        data: {
            userId,
            commandName,
            commandRaw
        }
    });
    return res;
}