import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import Cookies from './cookies';
import DiscordApi from './discord-api';
import * as jwt from './jwt';

export const verifyLoggedIn = async (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    const discordId = request.cookies[Cookies.IS_AUTHENTICATED];

    if (!discordId)
        return await sendUnauthorized(`no discord id`);
    
    done();
    
    async function sendUnauthorized(msg?: string) {
        return reply.code(401).send(msg || `Unauthorized.`);
    }
}

export const verifyDiscordAuth = async (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    const discordId = request.cookies[Cookies.IS_AUTHENTICATED];

    if (!discordId)
        return await sendUnauthorized(reply, `no discord id`);
    
    const user = await prisma.user.findUnique({
        where: {
            discordId
        }
    });

    if (!user)
        return await sendUnauthorized(reply, `no user found by discord id`);

    try {
        const dApi = new DiscordApi(user);
        await dApi.getMe();
        logger.debug('api validated successfully');
    } catch (e) {
        logger.error(e);
        return await sendUnauthorized(reply, `couldnt validate api`);
    }

    done();
}

export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    const token = request.cookies[Cookies.JWT];

    const { discordId } = jwt.validateJWT(token);

    const user = await prisma.user.findUnique({
        where: {
            discordId
        }
    });

    if (!user)
        return await sendUnauthorized(reply, `no user found by discord id`);

    // @ts-ignore
    request.user = user;

    done();
}

async function sendUnauthorized(reply: FastifyReply, msg?: string) {
    return reply.code(401).send(msg || `Unauthorized.`);
}