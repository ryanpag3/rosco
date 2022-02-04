import { PrismaClient } from '@prisma/client';
import path from 'path';
import { sortPrismaSchema } from 'prisma-schema-sorter';
import logger from './logger';

const prisma = new PrismaClient({
    rejectOnNotFound: true
});

sortPrismaSchema(path.join(__dirname, '../../prisma/schema.prisma'))
    .then(() => logger.debug('prisma schema sorted'));

export default prisma;