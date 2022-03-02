import logger from '../util/logger';
import RedisWordCache from '../util/redis-word-cache';

let LinkCache = new RedisWordCache('allowedLink', 'pattern');

// @ts-ignore
LinkCache.containsInvalidLink = async (serverId: string, content: string) => {
    const links = content.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi) || [];
    
    logger.debug(links);

    for (const link of links) {
        // check if link is in approved list
        if (await LinkCache.containsCachedWord(serverId, link)){
            logger.debug(`cached entry found for ${link}`);
            continue;
        }

        return true;
    }
    
    return false;
}

export default LinkCache;