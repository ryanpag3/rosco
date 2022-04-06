import { fastify } from '..';
import * as MeController from './me-controller';

const MeRoutes: any = [
    {
        method: 'GET',
        url: '/me',
        schema: {
            description: 'Get information about the currently logged in user.',
            response: {
                200: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: MeController.getMe
    },
    {
        method: 'GET',
        url: '/me/guilds',
        schema: {
            description: 'Get the current user guilds.',
            response: {
                200: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: MeController.getMyGuilds
    }
];

export default MeRoutes;