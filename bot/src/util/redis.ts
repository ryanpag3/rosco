import { createClient } from 'redis';
import logger from './logger';

const client = createClient({
    socket: {
        port: Number.parseInt(process.env.REDIS_PORT || '6379'),
        host: process.env.REDIS_HOST || 'localhost',
        connectTimeout: Number.parseInt(process.env.REDIS_CONNECT_TIMEOUT || '5000')
    }
});

(async () => {
    try {
        await client.connect();
        logger.debug(`redis connection established.`);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();

const redis = client;

export default redis;