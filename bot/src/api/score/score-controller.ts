import { RouteHandlerMethod } from 'fastify';
import * as ScoreService from '../../service/score';
import logger from '../../util/logger';

export const getScores: RouteHandlerMethod = async (request, reply) => {
    let {
        page,
        amount,
        filter,
        scoreboard
    } = request.query as any;

    page = page ? Number.parseInt(page) : page;
    amount = amount ? Number.parseInt(amount) : amount;

    try {
        const scores = await ScoreService.list(request.server as any, page, amount, filter, scoreboard);
        logger.info(scores);
        return reply.status(200).send(JSON.stringify(scores));
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}