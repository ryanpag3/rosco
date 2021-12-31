require('dotenv').config({
    path: '.env.test'
});
import execa from 'execa';
import logger from './src/util/logger';
import prisma from './src/util/prisma';

beforeAll(async () => {
    const stdout = await execa.command('prisma migrate dev');
    logger.trace(stdout);
}, 10000);

afterEach(async () => {
    // @ts-ignore
    for (const { tablename } of await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`) {
        if (tablename !== '_prisma_migrations') {
            // @ts-ignore
            await prisma[tablename.toLowerCase()].deleteMany({where: {}});
            logger.trace(`truncated ${tablename}`);
        } 
    }
    await prisma.$disconnect();
});

export default {}