import logger from '../util/logger';
import prisma from '../util/prisma';
import redis from '../util/redis';

export default class WordCache {
    private cooldownInMs: number = Number.parseInt(process.env?.KEYWORD_CACHE_COOLDOWN || '10000');
    private isOnCooldown: boolean = false;
    private delimiter: string;

    private words: any = {};
    
    constructor(delimiter: string) {
        this.delimiter = delimiter;
    }

    /**
     * Build the word cache. By default this will respect a configured timeout period.
     */
    buildInMemoryCache = async (bypassCooldown: boolean = false): Promise<void> => {
        if (this.isOnCooldown && !bypassCooldown) {
            logger.trace(`Skipping word cache build. Cooldown is active for delimiter: ${this.delimiter}`);
            return;
        }
        
        for await (const key of redis.scanIterator({
            TYPE: 'STRING',
            MATCH: `${this.delimiter}.*`
        })) {
            const dataAsString = await redis.get(key);
            if (!dataAsString) 
                continue;
            const wordObject = JSON.parse(dataAsString);
            this.words[wordObject.id] = wordObject;
        }

        logger.debug(`rebuilt cache with ${Object.keys(this.words)} values.`);

        this.isOnCooldown = true;
        setTimeout(() => this.isOnCooldown = false, this.cooldownInMs);
    }

    baselineWordCacheToDatabase = async () => {
        const keys = await redis.keys(`${this.delimiter}.*`);

        // @ts-ignore        
        const records: { id: string }[] = await prisma[this.delimiter].findMany({});

        const toBeDeletedKeys = keys.filter((k) => records.filter((r) => r.id !== k));

        for await (const key of toBeDeletedKeys) {
            await redis.del(key);
        }

        for (const [i, record] of records.entries()) {
            await this.cacheRecordInRedis(record)
        }
    }

    cacheRecordInRedis = async (record: any, bypassCache: boolean = true) => {
        logger.trace(`caching word ${record.id}`);
        const r = await redis.set(this.buildId(record.id), JSON.stringify(record));
        await this.buildInMemoryCache(bypassCache);
        return r;
    }

    deleteCachedWord = async (id: string) => {
        logger.trace(`deleting cached word ${id}`);
        const res = await redis.del(this.buildId(id));
        await this.buildInMemoryCache(true); // always bypass
        return res;
    }

    messageContainsCachedWord = (rawMsg: string) => {
        if (!this.words)
            throw new Error('Cannot validate if message contains cached word. Cached is not built!');
            
        return Object.values(this.words).some((parsed: any) => {
            return this.isValidCachedWord(parsed.word, rawMsg);
        });
    }

    isValidCachedWord = (cachedWord: string, content: string) => {
        return (
            this.isValidStartsWith(cachedWord, content) ||
            this.isValidEndsWith(cachedWord, content) ||
            content.includes(cachedWord)
        )
    }

    isValidStartsWith = (cachedWord: string, content: string) => {
        let validStartsWith = false;

        if (cachedWord.endsWith('*')) {
            const subst = cachedWord.slice(0, -1);
            validStartsWith = content.startsWith(subst);
        }
    
        return validStartsWith;
    }

    isValidEndsWith = (cachedWord: string, content: string) => {
        let validEndsWith = false;

        if (cachedWord.startsWith('*')) {
            const subst = cachedWord.substring(1);
            validEndsWith = content.startsWith(subst);
        }
    
        return validEndsWith;
    }

    buildId(recordId: string) {
        return `${this.delimiter}.${recordId}`;
    }

    deleteCachedKeyword = async (recordId: string, bypassCache: boolean = true) => {
        logger.trace(`deleting cached word ${recordId}`);
        const r = await redis.del(this.buildId(recordId));
        await this.buildInMemoryCache(bypassCache);
        return r;
    }

    getWord = async (recordId: string) => {
        const wordId = this.buildId(recordId);
        const raw = await redis.get(wordId);
        if (!raw)
            return null;
        return JSON.parse(raw);
    }

    getValidWords = (content: string, serverId: string) => {
        if (this.words)
            throw new Error('Cannot get valid words. Word cache has not been built!');

        const validWords = Object.values(this.words).filter((parsed: any) => {
            return this.isValidCachedWord(parsed.word, content) 
                    && parsed.serverId === serverId;
        });

        return validWords;
    }
}