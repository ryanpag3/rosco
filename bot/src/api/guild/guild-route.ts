import { fastify } from '..';
import * as GuildController from './guild-controller';

const GuildRoutes = [
    {
        method: 'GET',
        url: '/guild/:id',
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
    }
];

export default GuildRoutes;