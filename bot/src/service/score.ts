import { Prisma } from '@prisma/client';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

export const create = async (data: Prisma.ScoreCreateInput) => {
    try {
        return prisma.score.create({
            data
        });
    } catch (e) {
        if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
            throw e;
        } else {
            if (e.code === 'P2002') {
                throw new BotError(`A score already exists in this server with that name.`);
            }
            throw e;
        }
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