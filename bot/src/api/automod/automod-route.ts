import { fastify } from '..';
import * as AutoModController from './automod-controller';

const AutoModRoutes = [
    {
        method: 'POST',
        url: '/automod/:guildId/banned-words/toggle',
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
        handler: AutoModController.toggleBannedWordsModule    
    }
];

export default AutoModRoutes;