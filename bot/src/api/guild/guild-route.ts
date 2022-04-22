import { fastify } from '..';
import * as GuildController from './guild-controller';

const GuildRoutes = [
    {
        method: 'GET',
        url: '/guild/:guildId',
        schema: {
            description: 'Get metadata about a guild.',
            response: {
                200: {},
                301: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: GuildController.getGuild
    },
    {
        method: 'POST',
        url: '/guild/:guildId/timezone',
        schema: {
            description: 'Update the timezone configuration for the specified guild.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]), 
        handler: GuildController.updateGuildTimezone
    },
    {
        method: 'GET',
        url: '/guild/:guildId/permissions',
        schema: {
            description: 'An array of permission objects with allowed roles.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: GuildController.getPermissions
    },
    {
        method: 'GET',
        url: '/guild/:guildId/roles',
        schema: {
            description: 'Get an array of roles for the specified guild.',
            response: {
                200: {},
                400: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: GuildController.getGuildRoles
    }
];

export default GuildRoutes;