import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { FastifyInstance } from 'fastify';
import { FastifyCookieOptions } from 'fastify-cookie';
import logger from '../util/logger';
import prisma from '../util/prisma';
import SwaggerConfig from './swagger';
import { verifyDiscordAuth, verifyLoggedIn } from './util/auth';
import Cookies from './util/cookies';
import DiscordApi from './util/discord-api';

export default async (fastify: FastifyInstance) => {
    fastify.register(require('fastify-swagger'), SwaggerConfig as any);

    fastify.ready(err => {
        if (err) throw err;
        fastify.swagger();
    });

    fastify.register(require('fastify-cookie'), {
        secret: process.env.COOKIE_SECRET || 'iwinagainlewstherin',
        parseOptions: {}
    } as FastifyCookieOptions);

    fastify.decorate('verifyDiscordAuth', verifyDiscordAuth);
    fastify.decorate('verifyLoggedIn', verifyLoggedIn);

    // this must be called locally to ensure the server instance is properly decorated
    const routes = require('./route').default;

    for (const route of routes) {
        const oldHandler = route.handler;
        // @ts-ignore
        route.preHandler = route.preHandler?.map((r) => fastify[r]);
        
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