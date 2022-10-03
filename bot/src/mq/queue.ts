import BullQueue from 'bull';
import logger from '../util/logger';
import RedisConfig from '../util/redis-config';

export default class Queue extends BullQueue {
    constructor(name: string) {
        const BullConfig = {
            redis: RedisConfig
        };
        super(name, BullConfig);
        logger.info(`New queue instantiated: ${name}`);
    }
};