import { FastifyInstance } from 'fastify';
import logger from '../util/logger';
import SwaggerConfig from './swagger';

export default async (fastify: FastifyInstance) => {
    fastify.register(require('fastify-swagger'), SwaggerConfig as any);

    fastify.ready(err => {
        if (err) throw err;
        fastify.swagger();
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
                logger.error(`Uncaught exception from handler`, e);
                res.send(500);
            }
        }
        fastify.route(route);
    }
}