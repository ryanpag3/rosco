import { fastify } from '..';
import SwaggerErrorDescription from '../util/swagger-error-description';
import SwaggerType from '../util/swagger-type';
import * as MeController from './me-controller';

const MeRoutes: any = [
    {
        method: 'GET',
        url: '/me',
        schema: {
            description: 'Get information about the currently logged in user.',
            response: {
                200: {
                    description: 'Info on the currently logged in user.',
                    type: SwaggerType.OBJECT,
                    properties: {
                        username: { type: SwaggerType.STRING }
                    }
                },
                500: {
                    description: SwaggerErrorDescription.INTERNAL_SERVER_ERROR,
                    type: SwaggerType.NULL
                }
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
            params: {
                type: 'object',
                properties: {
                    canManage: { type: 'boolean' }
                }
            },
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