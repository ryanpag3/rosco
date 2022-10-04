import { RouteHandlerMethod } from 'fastify';
import { getMaxGridSize, getNormalizedDocument } from '../../service/turfwar-grid-builder';
import logger from '../../util/logger';

export const getGrid: RouteHandlerMethod = async (request, reply) => {
    try {
        const gridDocument = await getNormalizedDocument();
        const maxGridSize = getMaxGridSize();

        return reply
                .status(200)
                .headers({
                    'Content-Type': 'application/json'
                })
                .send(JSON.stringify({
                    maxGridSize,
                    grid: gridDocument
                }));
    } catch (e) {
        logger.error(`There was an error getting the turfwar grid.`, e);
        return reply.status(500).send();
    }
}