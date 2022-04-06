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

const timeoutPeriod = 30000;
let isOnTimeout = false;
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && isOnTimeout === false) {
    const { sortPrismaSchema } = require('prisma-schema-sorter');
    sortPrismaSchema(path.join(__dirname, '../../prisma/schema.prisma'))
        .then(() => {
            isOnTimeout = true;
            setTimeout(() => isOnTimeout = false, timeoutPeriod);    
            logger.trace('prisma schema sorted')
        });
}

export default prisma;