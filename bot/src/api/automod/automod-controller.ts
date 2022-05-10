import { RouteHandlerMethod } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';

export const toggleBannedWordsModule: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { guildId } = request.params as any;
    const { isEnabled } = request.query as any;

    try {
        await prisma.server.update({
            where: {
                discordId: guildId
            },
            data: {
                autoModBannedWordsEnabled: isEnabled === 'true'
            }
        });

        return reply.status(200).send();
    } catch (e) {
        logger.error(e);
    }
    return reply.status(500).send();
}

export const setBannedWords: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { guildId } = request.params as any;
    let { words } = request.query as any;
    words = decodeURIComponent(words).split(',');
    
    return reply.status(200).send();
}