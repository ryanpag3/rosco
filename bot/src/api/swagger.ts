import { FastifyRegisterOptions } from 'fastify';
import { SwaggerOptions } from '@fastify/swagger';

const SwaggerConfig: SwaggerOptions = {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Rosco Bot API',
            // @ts-ignore
            version: require('../../package.json').version
        },
        externalDocs: {
            url: 'https://wiki.roscobot.com',
            description: 'Bot documentation here'
        },
        host: process.env.FASTIFY_HOST || 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: (process.env.NODE_ENV !== 'production')
}

export default SwaggerConfig;