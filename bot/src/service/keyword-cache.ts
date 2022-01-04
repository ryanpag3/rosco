import { Keyword } from '@prisma/client';
import { Message } from 'discord.js';
import logger from '../util/logger';
import redis from '../util/redis';

let KEYWORD_VALUES: any;
let KEYWORDS: any;

let isOnCooldown = false;

export const buildKeywordValues = async (bypassCooldown: boolean = false) => {
    if (isOnCooldown && !bypassCooldown) {
        logger.trace(`Skipping rebuild, cooldown is active.`);
        return;
    }

    logger.debug(`building keyword values`);

    KEYWORD_VALUES = [];
    KEYWORDS = {};

    for await (const key of redis.scanIterator({
        TYPE: 'string',
        MATCH: 'keyword.*'
    })) {
        let keyword: any = await redis.get(key);
        if (!keyword)
            continue;
        keyword = JSON.parse(keyword) as Keyword;
        logger.trace(`adding "${keyword.keyword}" to keyword cache.`);
        let i = 0;
        KEYWORDS[keyword?.id + i] = keyword;
        KEYWORD_VALUES.push(keyword.keyword);   
    }

    logger.debug(`rebuilt keyword cache with ${KEYWORD_VALUES.length} entries.`);

    isOnCooldown = true;
    setTimeout(() => isOnCooldown = false, Number.parseInt(process.env.KEYWORD_CACHE_COOLDOWN || '10000'));
}

export const doesKeywordsExist = (fullMessage: string) => {
    if (!KEYWORD_VALUES)
        throw new Error(`Cannot validate if keyword exists. Keywords cache not initialized!`);
    return Object.values(KEYWORDS).some((parsed: any) => {
        return fullMessage.includes(parsed.keyword);
    });
}

export const getValidKeywords = (content: string, serverId: string) => {
    if (!KEYWORD_VALUES)
        throw new Error(`Cannot validate if keyword exists. Keywords cache not initialized!`);

    return Object.values(KEYWORDS).filter((parsed: any) => {
        return content.includes(parsed.keyword) && parsed.serverId === serverId;
    }) as any;
}

export const cacheKeyword = async (keyword: Keyword) => {
    logger.trace(`caching keyword ${keyword.id}`);
    const res = await redis.set(buildId(keyword.id), JSON.stringify(keyword));
    buildKeywordValues(true)
        .then(() => logger.trace('keyword map rebuilt'));
    return res;
}

export const deleteCachedKeyword = async (keywordId: string) => {
    logger.trace(`deleting cached keyword ${keywordId}`);
    const res = await redis.del(buildId(keywordId));
    buildKeywordValues(true)
        .then(() => logger.trace('keyword map rebuilt'));
    return res;
}

export const getKeyword = async (keywordId: string) => {
    logger.trace(`getting cached keyword ${keywordId}`);
    await buildKeywordValues(true);
    return redis.get(keywordId);
}

const buildId = (keywordId: string) => {
    return `keyword.${keywordId}`;
}

