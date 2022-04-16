import { FastifyInstance } from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';
import logger from '../util/logger';
import SwaggerConfig from './swagger';
import { verifyJWT } from './util/auth';

export default async (fastify: FastifyInstance) => {
    await fastify.register(require('fastify-swagger'), SwaggerConfig as any);

    await fastify.register(require('fastify-cookie'), {
        secret: process.env.COOKIE_SECRET || 'iwinagainlewstherin',
        parseOptions: {}
    } as FastifyCookieOptions);

    await fastify.register(require('fastify-auth'));
    fastify.decorate('verifyJWT', verifyJWT);

    logger.debug(`setting up cors`);
    await fastify.register(require('fastify-cors'), {
        credentials: true,
        // @ts-ignore
        origin: (origin, cb) => {
            if (!origin) 
                return cb(null, false);
            
            const hostname = new URL(origin).hostname;
            if (hostname === 'localhost') {
                cb(null, true);
                return;
            }

            if (hostname === 'discord') {
                cb(null, true);
                return;
            }

            if (hostname === 'roscobot') {
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
                return await oldHandler(req, res);
            } catch (e) {
                logger.error(`Uncaught exception from handler`, (e as any).message);
                logger.trace(e);
                return res.status(500).send();
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