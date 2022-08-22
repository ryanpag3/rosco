import { FastifyInstance } from 'fastify';
import { FastifyCookieOptions } from '@fastify/cookie';
import logger from '../util/logger';
import SwaggerConfig from './swagger';
import { verifyJWT } from './util/auth';
import DiscordApi from './util/discord-api';

export default async (fastify: FastifyInstance) => {
    await fastify.register(require('@fastify/swagger'), SwaggerConfig as any);

    await fastify.register(require('@fastify/cookie'), {
        secret: process.env.COOKIE_SECRET || 'iwinagainlewstherin',
        parseOptions: {}
    } as FastifyCookieOptions);

    await fastify.register(require('@fastify/auth'));
    fastify.decorate('verifyJWT', verifyJWT);

    logger.debug(`setting up cors`);
    await fastify.register(require('@fastify/cors'), {
        credentials: true,
        // @ts-ignore
        origin: (origin, cb) => {
            if (!origin) 
                return cb(null, false);
            
            const hostname = new URL(origin).hostname;

            logger.trace(`cors hostname: ${hostname}`);

            if (hostname.includes('localhost')) {
                cb(null, true);
                return;
            }

            if (hostname.includes('discord')) {
                cb(null, true);
                return;
            }

            if (hostname.includes('roscobot')) {
                cb(null, true);
                return;
            }

            cb(null, false);
        },
        exposedHeaders: true
    });

    // this must be called locally to ensure the server instance is properly decorated
    const routes = require('./route').default;

    for (const route of routes) {
        const oldHandler = route.handler;
        
        // @ts-ignore
        route.handler = async (req, res) => {
            try {
                logger.debug(req.url);
                return await oldHandler(req, res);
            } catch (e) {
                logger.error(`Uncaught exception from handler: ${req.url}`, e);
                logger.trace(e);
                await res.status(500).send();
                const api = new DiscordApi(req.user);
                await api.clearAccessToken();
            }
        }

        logger.info(`loading ` + route.url);
        fastify.route(route);
    }

    fastify.ready(err => {
        if (err) throw err;
        fastify.swagger();
    });
}