require('dotenv').config({
    path: '.env.test'
});
import execa from 'execa';
import logger from './src/util/logger';
import prisma from './src/util/prisma';

beforeAll(async () => {
    const stdout = await execa.command('prisma migrate deploy');
    logger.trace(stdout);
}, 10000);

afterEach(async () => {
    // @ts-ignore
    for (const { tablename } of await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
        if (tablename !== '_prisma_migrations') {
            // @ts-ignore
            await prisma[camelize(tablename)].deleteMany({where: {}});
            logger.trace(`truncated ${tablename}`);
        } 
    }
    await prisma.$disconnect();
});

function camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export default {}