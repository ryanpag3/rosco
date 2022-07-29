import { Prisma, Server } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

export const create = async (data: Prisma.ScoreCreateInput) => {
    try {
        return prisma.score.create({
            data
        });
    } catch (e) {
        if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_CONSTRAINT)
            throw new BotError(`A score already exists in this server with that name.`);
        throw e;
    }
}

export const update = async (name: string, serverId: string, data: Prisma.ScoreUpdateInput) => {
    try {
        return prisma.score.update({
            where: {
                name_serverId: {
                    name,
                    serverId
                }
            },
            data
        });
    } catch (e) {
        if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
            throw e;
        } else {
            if (e.code === 'P2002') {
                throw new BotError(`Cannot rename. Bot exists in this server with that new-name value.`);
            }
            throw e;
        }
    }
}

export const findUnique = async (args: Prisma.ScoreWhereUniqueInput) => {
    return prisma.score.findUnique({
        where: args
    });
}

export const findMany = async (args: Prisma.ScoreWhereInput, take?: number, offset?: number) => {
    return prisma.score.findMany({
        where: args,
        take,
        skip: offset
    });
}

export const del = async (where: Prisma.ScoreWhereInput) => {
    return prisma.score.deleteMany({
        where
    });
}

export const list = async (
    server: Server,
    take: number = 10,
    skip: number = 0,
    filter?: string|null,
    scoreboardName?: string
) => {
    let scoreboard;
    if (scoreboardName) {
        scoreboard = await prisma.scoreboard.findUnique({
            where: {
                name_serverId: {
                    name: scoreboardName,
                    serverId: server.id
                }
            }
        });
    }


    await prisma.score.findMany({
        where: {
            serverId: server?.id
        },
        include: {
            ScoreboardScore: {
                include: {
                    Score: true
                }
            }
        }
    })

    let ScoreboardScore;
    if (scoreboard) {
        ScoreboardScore = {
            some: {
                scoreboardId: scoreboard?.id
            }
        };
    }
    const total = await prisma.score.count({
        where: {
            serverId: server?.id,
            name: {
                contains: filter || undefined
            },
            ScoreboardScore
        }
    });

    const scores = await prisma.score.findMany({
        include: {
            ScoreboardScore: true
        },
        where: {
            serverId: server?.id,
            name: {
                contains: filter || undefined
            },
            ScoreboardScore
        },
        take,
        skip,
        orderBy: {
            amount: 'desc'
        }
    });

    return {
        total,
        scores
    };
}

export const listByPage = async (
    server: Server, 
    page: number = 1,
    amount: number = 10,
    filter?: string|null, 
    scoreboardName?: string
) => {
     return list(server, amount, amount * (page - 1), filter, scoreboardName);
}