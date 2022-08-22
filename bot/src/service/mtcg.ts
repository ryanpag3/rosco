import { DateTime, Duration } from 'luxon';
import logger from '../util/logger';
import prisma from '../util/prisma';
import redis from '../util/redis';
import * as Scryfall from '../util/scryfall';

export const startUpdateInterval = async () => {
    await setup();
    setInterval(() => {
        logger.debug(`Running automated MTCG database update.`);
        setup();
    }, Duration.fromObject({ hours: 1 }).toMillis());
}

export const setup = async () => {
    try {
        const redisKey = 'mtcg_last_updated';

        const lastUpdated = await redis.get(redisKey);

        if (lastUpdated && DateTime.fromISO(lastUpdated).plus({ days: 1 }) > DateTime.now()) {
            logger.debug(`MTCG card database update on cooldown.`);
            return;
        }

        logger.info(`Updating MTCG card database from scryfall.`);

        const bulkData = await Scryfall.getBulkData('default_cards');

        await prisma.magicTheGatheringCard.deleteMany();

        const mapped = bulkData.map((card: any) => {
            return {
                id: card.id,
                name: card.name,
                setName: card.set_name,
                releasedAt: new Date(card.released_at),
                card
            }
        });

        for (const chunk of splitToChunks(mapped, 10)) {
            const res = await prisma.magicTheGatheringCard.createMany({
                data: chunk
            });

            logger.info(`Inserted ${res.count} MTCG cards into the database.`);
        }

        await redis.set(redisKey, DateTime.now().toISO());

    } catch (e) {
        logger.error(`There was an error while setting up the MTCG card database.`, e);
    }
}

const splitToChunks = (array: any[], parts: number) => {
    let result = [];
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
}