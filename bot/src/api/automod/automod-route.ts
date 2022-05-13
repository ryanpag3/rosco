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
    }
];

export default AutoModRoutes;