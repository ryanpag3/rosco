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
    }
];

export default GuildRoutes;