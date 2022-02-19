require('dotenv').config({
    path: '.env.test'
});
import execa from 'execa';
import './src/util/command-subcommand-map';
import { baselineKeywordCacheToDatabase, buildKeywordValues } from './src/service/keyword-cache';
import logger from './src/util/logger';
import prisma from './src/util/prisma';
import redis from './src/util/redis';

beforeAll(async () => {
    
    let stdout = await execa.command('yarn migrate reset --force');
    logger.trace(stdout);

    stdout = await execa.command('yarn migrate deploy');
    logger.trace(stdout);

    await baselineKeywordCacheToDatabase();
    await buildKeywordValues();
}, 30000);

beforeEach(async () => {
    // const stdout = await execa.command('yarn migrate reset --force');
    // logger.trace(stdout);
    //@ts-ignore
    for (const { tablename } of await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
        if (tablename !== '_prisma_migrations' && !tablename.startsWith('_')) {
            // @ts-ignore
            await prisma[camelize(tablename)].deleteMany({where: {}});
            logger.trace(`truncated ${tablename}`);
        } 
    }
    await prisma.$disconnect();
});

afterAll(async () => {
    try {
        await redis.quit()
    } catch (e) {
        // noop
    }});

function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export default {}