
import { RouteHandlerMethod } from 'fastify';
import randomColor from 'randomcolor';
import * as ScoreService from '../../service/score';
import logger from '../../util/logger';
import prisma from '../../util/prisma';

export const getScores: RouteHandlerMethod = async (request, reply) => {
    let {
        page,
        amount,
        take,
        skip,
        filter,
        scoreboard
    } = request.query as any;

    skip = skip ? Number.parseInt(skip) : skip;
    take = take ? Number.parseInt(take) : take;
    page = page ? Number.parseInt(page) : page;
    amount = amount ? Number.parseInt(amount) : amount;

    try {
        let scores;
        if (take !== undefined && skip !== undefined) {
            scores = await ScoreService.list(request.server as any, take, skip, filter, scoreboard);
        } else if (page !== undefined && amount !== undefined) {
            scores = await ScoreService.listByPage(request.server as any, page, amount, filter, scoreboard);
        } else {
            throw new Error(`Invalid pagination provided.`);
        }
        
        logger.debug(scores);
        return reply.status(200).send(JSON.stringify(scores));
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}

export const updateScore: RouteHandlerMethod = async (request, reply) => {
    const { scoreId } = request.params as any;

    try {
        const updateData: any = {};
        const keys = Object.keys(request.body as any);
        for (const key of keys) {
            if (!(request.body as any)[key])
                continue;
            updateData[key] = (request.body as any)[key];
        }

        await prisma.score.update({
            where: {
                id: scoreId
            },
            data: updateData
        });
        
        return reply.status(200).send();
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}

export const createScore: RouteHandlerMethod = async (request, reply) => {
    let {
        name,
        description,
        amount,
        color
    } = request.body as any;

    amount = amount ? amount : 0;
    color = color ? color: randomColor(); 

    try {
        const s = await prisma.score.create({
            data: {
                serverId: (request as any).server.id,
                name,
                description,
                amount,
                color
            }
        });

        logger.info(s);

        return reply.status(200).send();
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}