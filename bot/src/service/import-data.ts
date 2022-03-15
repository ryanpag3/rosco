import { Server, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import randomColor from 'randomcolor';
import * as uuid from 'uuid';
import logger from '../util/logger';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

export const importDataFromScoreBot = async (channelId: string, user: User, server: Server, data: ScoreBotImportData) => {
    data = mapIdsToUuids(data);
    data = mapAssociatedIds(data);

    data.scores = data.scores.map((s) => {
        if (s.type !== 'SERVER')
            s.name = `${s.type.toLowerCase()}_${s.name}`;
        return s;
    });

    for (const scoreboard of data.scoreboards) {
        try {
            await prisma.scoreboard.create({
                data: {
                    id: scoreboard.id as string,
                    name: scoreboard.name,
                    description: scoreboard.description,
                    serverId: server.id,
                    channelId,
                    userId: user.id
                }
            })
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT) {
                logger.trace(e);
            } else {
                logger.error(e);
            }
        }
    }

    for (const score of data.scores) {
        const b = score.ScoreBoardId ? {
            Scoreboards: {
                connect: {
                    id: score.ScoreBoardId as string
                }
            }
        } : undefined;
        try {
            await prisma.score.create({
                // @ts-ignore
                data: {
                    id: score.id as string,
                    name: score.name,
                    description: score.description,
                    color: randomColor(),
                    amount: score.value,
                    serverId: server.id,
                    channelId,
                    userId: user.id,
                    // @ts-ignore
                    ...b
                },
                include: {
                    Scoreboards: true
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT) {
                logger.trace(e);
            } else {
                logger.error(e);
            }
        }
    }

    for (const keyword of data.keywords) {
        try {
            await prisma.keyword.create({
                data: {
                    id: keyword.id as string,
                    word: keyword.name,
                    scoreId: keyword.ScoreId as string,
                    serverId: server.id,
                    userId: user.id
                }
            })
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT) {
                logger.trace(e);
            } else {
                logger.error(e);
            }
        }
    }
}

const mapIdsToUuids = (data: ScoreBotImportData) => {
    const keysToMap = ['scores', 'scoreboards', 'keywords'];
    const mappedData: any = {};

    for (const key of keysToMap) {
        // @ts-ignore
        mappedData[key] = data[key].map((e) => {
            e.oldId = e.id;
            e.id = uuid.v4();
            return e;
        })
    }

    return mappedData;
}

const mapAssociatedIds = (data: ScoreBotImportData) => {
    const scores = buildMap(data, 'scores');
    const scoreboards = buildMap(data, 'scoreboards');

    // @ts-ignore
    data.scores = data.scores.map((s) => {
        // @ts-ignore
        const sb = scoreboards[s.ScoreBoardId];
        if (!sb)
            return s; // score does not have a valid associated scoreboard 
        // @ts-ignore
        s.OldScoreBoardId = s.ScoreBoardId;
        s.ScoreBoardId = sb.id;

        return s;
    });

    // @ts-ignore
    data.keywords = data.keywords.map((k) => {
        // @ts-ignore
        const s = scores[k.ScoreId];
        if (!s)
            return k;

        // @ts-ignore
        k.OldScoreId = k.ScoreId;
        k.ScoreId = s.id;

        return k;
    })

    return data;
}

const buildMap = (data: ScoreBotImportData, key: string) => {
    const m = {};
    // @ts-ignore
    for (const s of data[key]) {
        // @ts-ignore
        m[s.oldId] = s;
    }

    return m;
}

export interface ScoreBotImportData {
    scores: {
        id: number | string;
        oldId?: number;
        serverId: string;
        channelId: string;
        ScoreBoardId?: number | string;
        type: 'SCOREBOARD' | 'CHANNEL' | 'SERVER' | 'USER',
        name: string;
        description?: string;
        value: number;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
    }[];
    scoreboards: {
        id: number | string;
        oldId?: number;
        serverId: string;
        name: string;
        description?: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
    }[];
    keywords: {
        id: number | string;
        oldId?: number;
        name: string;
        serverId: string;
        ScoreId: number | string;
        createdAt: string;
        updatedAt: string;
    }[]
}