import { RouteHandlerMethod } from 'fastify';
import BannedWordCache from '../../service/banned-word-cache';
import LinkCache from '../../service/link-cache';
import logger from '../../util/logger';
import prisma from '../../util/prisma';

export const toggleModule: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { guildId, module } = request.params as any;
    const { isEnabled } = request.query as any;

    const modules: any = {
        'banned-words': 'autoModBannedWordsEnabled',
        'link-detect': 'autoModLinkDetectEnabled',
        'capslock-detect': 'autoModCapslockDetectEnabled'
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

export const setAllowedLinks: RouteHandlerMethod = async (request, reply) => {
    const { guildId } = request.params as any;
    const body: any = request.body;

    try {
        const s = await prisma.server.findUnique({
            where: {
                discordId: guildId
            }
        });

        const r = await prisma.$transaction(
            [
                prisma.allowedLink.deleteMany({
                    where: {
                        serverId: s.id
                    }
                }),
                ...body.map((l: string) => {
                    return prisma.allowedLink.create({
                        data: {
                            serverId: s.id,
                            pattern: l
                        }
                    })
                })
            ]
        );

        r.shift();

        await LinkCache.baselineFromDatabase();

        return reply.status(200).send();
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}

export const getCapslockSpamConfig: RouteHandlerMethod = async (request, reply) => {
    const { guildId } = request.params as any;
    
    try {
        const s = await prisma.server.findUnique({
            where: {
                discordId: guildId
            }
        });

        return reply.status(200).headers({
            'Content-Type': 'application/json'
        }).send(JSON.stringify({
            enabled: s.autoModCapslockDetectEnabled,
            length: s.autoModCapslockDetectLength
        }));
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}

export const setCapslockSpamLength: RouteHandlerMethod = async (request, reply) => {
    const { guildId } = request.params as any;
    let { length } = request.query as any;
 
    try {
        length = Number.parseInt(length);

        // TODO: add validation

        await prisma.server.update({
            where: {
                discordId: guildId
            },
            data: {
                autoModCapslockDetectLength: length
            }
        });
        
        return reply.status(200).send();
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}