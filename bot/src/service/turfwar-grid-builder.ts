import prisma from '../util/prisma';
import redis from '../util/redis';
import { CronJob } from 'cron';
import logger from '../util/logger';

let job: CronJob|undefined;

const REDIS_KEY = 'rosco-turfwar-grid';

export const startCronJob = async () => {
    stopBuildTimer();

    job = new CronJob(
        '*/30 * * * * *',
        async function() {
            await build();
        },
        null,
        true,
        'America/Los_Angeles'
    )
}

export const stopBuildTimer = () => {
    if (job) {
        job.stop();
    }
}

export const build = async () => {
    logger.debug('Building normalized turfwar grid');

    const limit = 1000;
    let offset = 0;

    const totalRows = await prisma.turfwarPlot.count();

    while (offset < totalRows) {
        const rows = await prisma.turfwarPlot.findMany({
            take: limit,
            skip: offset
        });

        const document = await getNormalizedDocument();

        for (const row of rows) {
            const key = `${row.x}_${row.y}`;
            document[key] = row;
        }
        
        logger.trace(JSON.stringify(document, null, 4));

        await writeDocumentToRedis(document);

        offset += limit;
    }
}

const getNormalizedDocument = async () => {
    let data = await redis.get(REDIS_KEY);

    if (!data) {
        return {};
    }

    return JSON.parse(data);
}

const writeDocumentToRedis = async (data: any) => {
    return await redis.set(REDIS_KEY, JSON.stringify(data));
}