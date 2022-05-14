import { RouteHandlerMethod } from 'fastify';
import BannedWordCache from '../../service/banned-word-cache';
import logger from '../../util/logger';
import prisma from '../../util/prisma';

export const toggleModule: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { guildId, module } = request.params as any;
    const { isEnabled } = request.query as any;

    const modules: any = {
        'banned-words': 'autoModBannedWordsEnabled',
        'link-detect': 'autoModLinkDetectEnabled'
    };

    if (!modules[module])
        return reply.status(400).send('Invalid module.');

    try {
        await prisma.server.update({
            where: {
                discordId: guildId
            },
            data: {
                [modules[module]]: isEnabled === 'true'
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
    words = decodeURIComponent(words).split(',').filter((w) => w !== '');
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

export const getBannedWordsData: RouteHandlerMethod = async (request, reply) => {
    const { guildId } = request.params as any;

    try {
        const server = await prisma.server.findUnique({
            where: {
                discordId: guildId
            },
            include: {
                BannedWord: true
            }
        });

        return reply.status(200).headers({
            'Content-Type': 'application/json'
        }).send(JSON.stringify({
            enabled: server.autoModBannedWordsEnabled,
            words: server.BannedWord.map((b) => b.word)
        }));
    } catch (e) {
        logger.error(e);
    }
    
    return reply.status(500).send();
}

export const getAllowedLinks: RouteHandlerMethod = async (request, reply) => {
    const { guildId } = request.params as any;

    try {
        const server = await prisma.server.findUnique({
            where: {
                discordId: guildId
            },
            include: {
                AllowedLink: true
            }
        });

        return reply.status(200).headers({
            'Content-Type': 'application/json'
        }).send(JSON.stringify({
            enabled: server.autoModLinkDetectEnabled,
            links: server.AllowedLink.map((l) => l.pattern)
        }));
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}