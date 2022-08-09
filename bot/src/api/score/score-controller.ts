
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { RouteHandlerMethod } from 'fastify';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import randomColor from 'randomcolor';
import * as ScoreService from '../../service/score';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

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

/**
 * I wrote pagination for this but I suspect users won't have enough scores for it to matter.
 * 
 * We may need to readdress this later.
 */
export const getAllScores: RouteHandlerMethod = async (request, reply) => {
    let {
        filter,
        scoreboard
    } = request.query as any;

    try {
        const { total } = await ScoreService.list(request.server as any, 1, 0, filter, scoreboard);
        const { scores } = await ScoreService.list(request.server as any, total, 0, filter, scoreboard);
        
        return reply.status(200).send(JSON.stringify(scores))
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
            if (key === 'name') {
                updateData[key] = updateData[key].trim();
            }
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
        name = name.trim();
        const s = await prisma.score.create({
            data: {
                serverId: (request as any).server.id,
                name,
                description,
                amount,
                color
            }
        });
        return reply.status(StatusCodes.OK).send(ReasonPhrases.OK);
    } catch (e) {
        logger.error(e);
        if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_CONSTRAINT)
            return reply.status(StatusCodes.CONFLICT).send(ReasonPhrases.CONFLICT);
    }

    return reply.status(500).send();
}

export const deleteScore: RouteHandlerMethod = async (request, reply) => {
    const { scoreId } = request.params as any;
    const { server } = request as any;

    try {
        const score = await prisma.score.findUnique({
            where: {
                id: scoreId
            },
            include: {
                Server: true
            }
        });

        if (score.serverId !== server.id) {
            logger.error(`Could not delete the score ${scoreId} because originating server ID did not match.`);
            return reply.status(401).send();
        }

        await prisma.score.delete({
            where: {
                id: scoreId
            }
        });

        return reply.status(200).send();
    } catch (e) {
        logger.error(e);
    }

    return reply.status(500).send();
}