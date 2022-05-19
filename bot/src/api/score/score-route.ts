import { fastify } from '..';
import * as ScoreController from './score-controller';

const ScoreRoutes = [
    {
        method: 'GET',
        url: '/score/:guildId',
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
    }
];

export default ScoreRoutes;