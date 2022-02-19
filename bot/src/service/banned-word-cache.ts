import logger from '../util/logger';
import redis from '../util/redis';

let isOnCooldown: boolean = false;
let bannedWords: any = {};
let bannedWordValues: any = [];

/**
 * This implementation is very similar to keyword-cache.ts
 * 
 * I'd love to remove the duplication but it felt like this implementation should probably fork at the time.
 */

interface BannedWord {
    word: string;
    serverId: string;
}

export const buildBannedWordsValues = async (bypassCooldown: boolean = false) => {
    if (isOnCooldown && !bypassCooldown) {
        logger.trace('Skipping banned words rebuild, cooldown is active.');
        return;
    }

    logger.debug('building banned words in-memory cache');

    for await (const key of redis.scanIterator({
        TYPE: 'string',
        MATCH: 'keyword.*'
    })) {
        let bannedWord: any = await redis.get(key);
        if (!bannedWord)
            continue;
        bannedWord = JSON.parse(bannedWord) as BannedWord;
        bannedWords[bannedWord?.serverId] = bannedWord; 
    }

    logger.debug('rebuilt')
} 