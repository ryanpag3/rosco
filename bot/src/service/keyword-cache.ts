import { Keyword } from '@prisma/client';
import WordCache from './word-cache';

export const cache = new WordCache('keyword');

export const buildKeywordValues = async (bypassCooldown: boolean = false) => {
    return cache.buildInMemoryCache(bypassCooldown);
}

export const baselineKeywordCacheToDatabase = async () => {
    return cache.baselineWordCacheToDatabase();
}

export const doesKeywordsExist = (fullMessage: string) => {
    return cache.messageContainsCachedWord(fullMessage);
}

export const getValidKeywords = (content: string, serverId: string) => {
    return cache.getValidWords(content, serverId);
}

export const cacheKeyword = async (keyword: Keyword, bypassCache: boolean = true) => {
    return cache.cacheRecordInRedis(keyword, bypassCache);
}

export const deleteCachedKeyword = async (keywordId: string) => {
    return cache.deleteCachedKeyword(keywordId);
}

export const getKeyword = async (keywordId: string) => {
    return cache.getWord(keywordId);
}