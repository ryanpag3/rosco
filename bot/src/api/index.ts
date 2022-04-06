require('dotenv').config({
    path: '../../.env'
});

import Fastify from 'fastify';
import logger from '../util/logger';
import setupServer from './setup-server';

export const fastify = Fastify();

const start = async () => {
    try {
        const port = process.env.FASTIFY_PORT || 3000;
        const host = process.env.FASTIFY_HOST || '0.0.0.0';
        await setupServer(fastify);
        logger.debug(`starting server`)
        await fastify.listen(port, host);
        logger.info(`Rosco BOT API has been started. Listening at ${host}:${port}`);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
};

start();
