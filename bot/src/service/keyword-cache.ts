import { Keyword } from '@prisma/client';
import logger from '../util/logger';
import prisma from '../util/prisma';
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
        KEYWORDS[keyword?.id] = keyword;
        KEYWORD_VALUES.push(keyword.keyword);
    }

    logger.debug(`rebuilt keyword cache with ${KEYWORD_VALUES.length} entries.`);

    isOnCooldown = true;
    setTimeout(() => isOnCooldown = false, Number.parseInt(process.env.KEYWORD_CACHE_COOLDOWN || '10000'));
}

export const baselineKeywordCacheToDatabase = async () => {
    const keys = await redis.keys('keyword.*')

    for await (const key of keys) {
        await redis.del(key);
    }

    const keywords = await prisma.keyword.findMany({
        where: {}
    });

    for (const [i, keyword] of keywords.entries()) {
        // make sure to trigger cache refresh on last iteration
        await cacheKeyword(keyword, i === keywords.length - 1);
    }
}

export const doesKeywordsExist = (fullMessage: string) => {
    if (!KEYWORD_VALUES)
        throw new Error(`Cannot validate if keyword exists. Keywords cache not initialized!`);
    return Object.values(KEYWORDS).some((parsed: any) => {
        return isValidKeyword(parsed, fullMessage);
    });
}

const isValidKeyword = (keyword: Keyword, content: string) => {
    return (isValidStartsWith(keyword, content)
        || isValidEndsWith(keyword, content))
        || content.includes(keyword.keyword);
}

const isValidStartsWith = (keyword: Keyword, content: string) => {
    let validStartsWith = false;

    if (keyword.keyword.endsWith('*')) {
        const subst = keyword.keyword.slice(0, -1);
        validStartsWith = content.startsWith(subst);
    }

    return validStartsWith;
}

const isValidEndsWith = (keyword: Keyword, content: string) => {
    let validEndsWith = false;

    if (keyword.keyword.startsWith('*')) {
        const subst = keyword.keyword.substring(1);
        validEndsWith = content.startsWith(subst);
    }

    return validEndsWith;
}

export const getValidKeywords = (content: string, serverId: string) => {
    if (!KEYWORD_VALUES)
        throw new Error(`Cannot validate if keyword exists. Keywords cache not initialized!`);

    return Object.values(KEYWORDS).filter((parsed: any) => {
        return isValidKeyword(parsed, content);
    }) as any;
}

export const cacheKeyword = async (keyword: Keyword, bypassCache: boolean = true) => {
    logger.trace(`caching keyword ${keyword.id}`);
    const res = await redis.set(buildId(keyword.id), JSON.stringify(keyword));
    await buildKeywordValues(bypassCache);
    return res;
}

export const deleteCachedKeyword = async (keywordId: string) => {
    logger.trace(`deleting cached keyword ${keywordId}`);
    const res = await redis.del(buildId(keywordId));
    await buildKeywordValues(true);
    return res;
}

export const getKeyword = async (keywordId: string) => {
    logger.trace(`getting cached keyword ${keywordId}`);
    keywordId = buildId(keywordId);
    await buildKeywordValues(true);
    return redis.get(keywordId);
}

export const buildId = (keywordId: string) => {
    if (keywordId.startsWith(`keyword.`))
        return keywordId;
    return `keyword.${keywordId}`;
}

