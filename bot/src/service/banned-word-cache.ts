import WordCache from './word-cache';

const BannedWordCache = new WordCache('bannedWord');

export const reload = async () => BannedWordCache.buildInMemoryCache(true);

export default BannedWordCache;