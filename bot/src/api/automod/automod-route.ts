import { fastify } from '..';
import * as AutoModController from './automod-controller';

const AutoModRoutes = [
    {
        method: 'POST',
        url: '/automod/:guildId/:module/toggle',
        schema: {
            description: 'Toggle the banned-words module on or off.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AutoModController.toggleModule    
    },
    {
        method: 'POST',
        url: '/automod/:guildId/banned-words',
        schema: {
            description: 'Set the banned words for a server.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AutoModController.setBannedWords
    },
    {
        method: 'GET',
        url: '/automod/:guildId/banned-words',
        schema: {
            description: 'Get the banned-words data for a guild.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AutoModController.getBannedWordsData
    },
    {
        method: 'GET',
        url: '/automod/:guildId/link-detect',
        schema: {
            description: 'Get the link-detect data for a guild.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AutoModController.getAllowedLinks
    },
    {
        method: 'POST',
        url: '/automod/:guildId/link-detect',
        schema: {
            description: 'Update links for server.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AutoModController.setAllowedLinks
    },
    {
        method: 'GET',
        url: '/automod/:guildId/capslock-detect',
        schema: {
            description: 'Get capslock detect configuration',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AutoModController.getCapslockSpamConfig
    },
    {
        method: 'POST',
        url: '/automod/:guildId/capslock-detect/length',
        schema: {
            description: 'Update capslock detect length',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AutoModController.setCapslockSpamLength
    }
];

export default AutoModRoutes;