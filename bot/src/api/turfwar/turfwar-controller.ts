import { RouteHandlerMethod } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';

export const getGraph = async () => {
    return {
        x: {
            max: 100,
            min: 0
        },
        y: {
            max: 100,
            min: 0
        }
    }
};

export const getCoordinates: RouteHandlerMethod = async (request, reply) => {
    try {
        const coords = await prisma.turfwarCoordinate.findMany();
        return reply.code(200).send(JSON.stringify(coords));
    } catch (e) {
        logger.error(e);
    }
    return reply.code(500).send();
}
