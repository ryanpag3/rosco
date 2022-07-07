import { fastify } from '..';
import * as ScoreController from './score-controller';

const ScoreRoutes = [
    {
        method: 'GET',
        url: '/guild/:guildId/score',
        schema: {
            description: 'Get guild scores',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: ScoreController.getScores
    },
    {
        method: 'GET',
        url: '/guild/:guildId/score/all',
        schema: {
            description: 'Get guild scores',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: ScoreController.getAllScores
    }, 
    {
        method: 'PATCH',
        url: `/guild/:guildId/score/:scoreId`,
        schema: {
            description: 'Update the values of a score.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: ScoreController.updateScore
    },
    {
        method: 'POST',
        url: `/guild/:guildId/score`,
        schema: {
            description: 'Create a score',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: ScoreController.createScore 
    }
];

export default ScoreRoutes;