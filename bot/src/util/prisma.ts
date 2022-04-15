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


export default prisma;