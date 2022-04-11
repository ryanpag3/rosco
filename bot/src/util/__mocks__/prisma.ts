import { PrismaClient } from '@prisma/client';
import { delay } from 'bluebird';
import { execSync } from 'child_process';
import fs from 'fs';
import path, { join } from 'path';
import { URL } from 'url';
import { v4 } from 'uuid';
import PrismaErrorCode from '../prisma-error-code';

const generateDatabaseURL = (schema: string) => {
    if (!process.env.DATABASE_URL) {
        throw new Error('please provide a database url');
    }
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.append('schema', schema);
    return url.toString();
};

const schemaId = `test-${v4()}`;
const prismaBinary = join(__dirname, '..', '..', '..', 'node_modules', '.bin', 'prisma');

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;

export const prisma = new PrismaClient({
    datasources: { db: { url } },
    rejectOnNotFound: (err) => {
        // @ts-ignore
        err.code = PrismaErrorCode.NOT_FOUND;
        return err;
    }
});

beforeEach(async () => {
    execSync(`${prismaBinary} db push`, {
        env: {
            ...process.env,
            DATABASE_URL: generateDatabaseURL(schemaId),
        },
    });

    while (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'node_modules', '.prisma', 'client', 'index.js'))) {
        await delay(50);
    }
}, 10000);
afterEach(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
    await prisma.$disconnect();
});

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export default prisma;