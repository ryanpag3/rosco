import path from 'path';
require('dotenv').config({
    path: path.join(__dirname, '../../.env')
});

import Fastify from 'fastify';
import logger from '../util/logger';
import setupServer from './setup-server';
import Cookies from './util/cookies';

export const fastify = Fastify();

fastify.addHook('onResponse', async (request, reply) => {
    if (reply.statusCode !== 200) {
        reply.clearCookie(Cookies.IS_AUTHENTICATED).clearCookie(Cookies.JWT);
    }
    
    return reply;
});

process.on('uncaughtException', (error) => {
    logger.error(error);
    // make sure the process exits if we hit a compilation error, so ts-node-dev can restart on next change
    if (error.message.includes('Compilation error in') || error.message.includes('Unable to compile')) process.exit(1);
});

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
