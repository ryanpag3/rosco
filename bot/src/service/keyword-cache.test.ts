import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';
import * as KeywordCache from './keyword-cache';
import redis from '../util/redis';

it('should save a keyword to the cache', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    const [ score ] = await prisma.score.findMany();

    const keyword = await prisma.keyword.create({
        data: {
            keyword: 'test',
            serverId: '1',
            scoreId: score.id
        }
    });

    const cached = await KeywordCache.cacheKeyword(keyword);

    const queried = await redis.get(KeywordCache.buildId(keyword.id));

    expect(queried).not.toBeNull();
});

it('should get a cached keyword', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    const [ score ] = await prisma.score.findMany();

    const keyword = await prisma.keyword.create({
        data: {
            keyword: 'test',
            serverId: '1',
            scoreId: score.id
        }
    });

    await KeywordCache.cacheKeyword(keyword);

    const queried = await KeywordCache.getKeyword(keyword.id);

    expect(queried).not.toBeNull();
});

it('should return null when no cached keyword exists', async () => {
    const queried = await KeywordCache.getKeyword('iwinagainlewstherin');

    expect(queried).toBeNull();
});

it('should delete a keyword from the cache', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    const [ score ] = await prisma.score.findMany();

    const keyword = await prisma.keyword.create({
        data: {
            keyword: 'test',
            serverId: '1',
            scoreId: score.id
        }
    });

    await KeywordCache.cacheKeyword(keyword);

    await KeywordCache.deleteCachedKeyword(keyword.id);

    const queried = await KeywordCache.getKeyword(keyword.id);

    expect(queried).toBeNull();
});

it('should return true if keyword does exist', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    const [ score ] = await prisma.score.findMany();

    const keyword = await prisma.keyword.create({
        data: {
            keyword: 'test',
            serverId: '1',
            scoreId: score.id
        }
    });

    await KeywordCache.cacheKeyword(keyword);

    const shouldBeTrue = KeywordCache.doesKeywordsExist('im test this');

    expect(shouldBeTrue).toBe(true);
});

