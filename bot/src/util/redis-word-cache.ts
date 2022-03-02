import { AllowedLink, BannedWord, Keyword } from '@prisma/client';
import logger from './logger';
import prisma from './prisma';
import redis from './redis';

/**
 * This is an implementation of WordCache that does not rely
 * on an in-memory store and just queries redis directly.
 */
export default class RedisWordCache {
    // The delimiter to determine which type of word is being cached.
    private delimiter: "bannedWord"|"keyword"|"allowedLink";

    // The property of the record which identifies the "word"
    private wordProperty: string;

    constructor(delimiter: "bannedWord"|"keyword"|"allowedLink", wordProperty: string) {
        this.delimiter = delimiter;
        this.wordProperty = wordProperty;
    }

    /**
     * Build a unique key for an object in Redis.
     */
    buildRedisKey = (serverId: string, id: string) => {
        return `${this.delimiter}.${serverId}.${id}`;
    }

    /**
     * Reset the Redis cache to the entries in the database.
     */
    baselineFromDatabase = async () => {
        logger.debug('baselining word cache to database');

        const keys = await redis.keys(`${this.delimiter}.*`);

        // @ts-ignore
        const records: any[] = await prisma[this.delimiter].findMany({});

        const toBeDeletedKeys = keys.filter((k) => records.filter((r) => this.buildRedisKey(r.serverId, r.id) !== k));

        if (toBeDeletedKeys.length > 0)
            await redis.del(toBeDeletedKeys);

        for (const r of records) {
            await this.cacheRecord(r);
        }

        logger.debug(`${toBeDeletedKeys.length} records removed from ${this.delimiter} cache.`);
        logger.debug(`${records.length} records upserted to ${this.delimiter} cache.`);
    }

    /**
     * Cache a supported record in Redis.
     */
    cacheRecord = async (record: BannedWord|Keyword|AllowedLink) => {
        return redis.set(this.buildRedisKey(record.serverId, record.id), JSON.stringify(record));
    }

    /**
     * Delete a cached record in Redis.
     */
    deleteRecord = async (serverId: string, id: string) => {
        return redis.del(this.buildRedisKey(serverId, id));
    }

    /**
     * Get a cached record from Redis.
     */
    getCachedRecord = async (serverId: string, id: string) => {
        return redis.get(this.buildRedisKey(serverId, id));
    };

    /**
     * Iterate through Redis cached entries and determine
     * whether the message content contains a cached word.
     */
    containsCachedWord = async (serverId: string, content: string) => {
        const keys = await redis.keys(this.buildRedisKey(serverId, '*'));

        for (const key of keys) {
            const rawVal = await redis.get(key);
            if (!rawVal)
                continue;
            const record = JSON.parse(rawVal);
            const word = record[this.wordProperty];
            const found = await this.cachedWordFoundInContent(word, content);
            if (found === true)
                return true;
        }

        return false;
    }

    /**
     * Check if a cached word exists in message content.
     * 
     * @param cachedWord - The cached word from Redis.
     * @param content - The entire message content.
     */
    cachedWordFoundInContent = async (cachedWord: string, content: string) => {
        const splitIntoWords = content.split(' ');
        
        for (const word of splitIntoWords) {
            const contains = this.wordStartsWith(word, cachedWord) ||
                             this.wordEndsWith(word, cachedWord) || 
                             word === cachedWord;
            if (contains === true)
                return true;
        }
        
        return false;
    }

    /**
     * Check if a word starts with a cached word.
     * 
     * @param word - The word from the message content.
     * @param cachedWord - The word from the cache.
     */
    wordStartsWith = (word: string, cachedWord: string) => {
        let startsWith = false;

        if (cachedWord.startsWith('*')) {
            const subStr = cachedWord.slice(0, -1);
            startsWith = word.startsWith(subStr);
        }

        return startsWith;
    }

    /**
     * Check if a word ends with a cached word.
     * 
     * @param word - The word from the message content.
     * @param cachedWord - The word from the cache.
     */
    wordEndsWith = (word: string, cachedWord: string) => {
        let endsWith = false;

        if (cachedWord.endsWith('*')) {
            const subStr = cachedWord.substring(1);
            endsWith = word.endsWith(subStr);
        }

        return endsWith;
    }
}