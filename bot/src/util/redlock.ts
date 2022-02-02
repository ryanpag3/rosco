import Client from 'ioredis';
import Redlock from 'redlock';

const client = new Client({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number.parseInt(process.env.REDIS_PORT || '6379'),
    connectTimeout: Number.parseInt(process.env.REDIS_CONNECT_TIMEOUT || '5000')
});

export const redlock = new Redlock(
    [client]
);

