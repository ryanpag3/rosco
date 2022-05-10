import { RouteHandlerMethod } from 'fastify';
import BannedWordCache from '../../service/banned-word-cache';
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
    const { guildId } = request.params as any;
    let { words } = request.query as any;
    words = decodeURIComponent(words).split(',');

    try {
        const s = await prisma.server.findUnique({
            where: {
                discordId: guildId
            }
        });

        const r = await prisma.$transaction(
            [
                prisma.bannedWord.deleteMany({
                    where: {
                        serverId: s.id
                    }
                }),
                ...words.map((w: string) => {
                    return prisma.bannedWord.create({
                        data: {
                            serverId: s.id,
                            word: w
                        }
                    })
                })
            ]
        );

        // we dont need the delete result
        r.shift();

        await BannedWordCache.baselineFromDatabase();

        return reply.status(200).send();
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}