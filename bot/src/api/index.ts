import Fastify from 'fastify';
import logger from '../util/logger';
import SwaggerConfig from './swagger';

const fastify = Fastify();

fastify.register(require('fastify-swagger'), SwaggerConfig as any);

fastify.ready(err => {
    if (err) throw err;
    fastify.swagger();
});

const start = async () => {
    try {
        const port = process.env.FASTIFY_PORT || 3000;
        const host = process.env.FASTIFY_HOST || '0.0.0.0'
        await fastify.listen(port, host);
        logger.info(`Rosco BOT API has been started. Listening at ${host}:${port}`);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
};

start();
