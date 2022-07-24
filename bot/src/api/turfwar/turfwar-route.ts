import * as TurfwarController from './turfwar-controller';
import { fastify } from '..';

const TurfwarRoutes = [
    {
        method: 'GET',
        url: '/turfwar',
        schema: {
            description: 'Get metadata information about Turfwar.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: TurfwarController.getGraph
    },
    {
        method: 'GET',
        url: '/turfwar/coordinates',
        schema: {
            description: 'Get the current coordinate metadata for the Turfwar grid.',
            response: {
                200: {},
                500: {}
            }
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: TurfwarController.getCoordinates
    }
];

export default TurfwarRoutes;