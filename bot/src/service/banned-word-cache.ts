import RedisWordCache from '../util/redis-word-cache';

const BannedWordCache = new RedisWordCache('bannedWord', 'word');

export default BannedWordCache;