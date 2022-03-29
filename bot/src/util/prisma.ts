import { PrismaClient } from '@prisma/client';
import path from 'path';
import logger from './logger';
import PrismaErrorCode from './prisma-error-code';

export class NotFoundError extends Error {

}

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],    
    rejectOnNotFound: (err) => {
        // @ts-ignore
        err.code = PrismaErrorCode.NOT_FOUND;
        return err;
    }
});

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const { sortPrismaSchema } = require('prisma-schema-sorter');

    sortPrismaSchema(path.join(__dirname, '../../prisma/schema.prisma'))
        .then(() => logger.debug('prisma schema sorted'));
}

export default prisma;