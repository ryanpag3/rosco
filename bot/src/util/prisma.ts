import { PrismaClient } from '@prisma/client';
import path from 'path';
import logger from './logger';

const prisma = new PrismaClient({
    rejectOnNotFound: true
});

if (process.env.NODE_ENV !== 'production') {
    const { sortPrismaSchema } = require('prisma-schema-sorter');

    sortPrismaSchema(path.join(__dirname, '../../prisma/schema.prisma'))
        .then(() => logger.debug('prisma schema sorted'));
}

export default prisma;