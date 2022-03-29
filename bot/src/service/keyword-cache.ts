import RedisWordCache from '../util/redis-word-cache';

const KeywordCache = new RedisWordCache('keyword', 'word');

export default KeywordCache;