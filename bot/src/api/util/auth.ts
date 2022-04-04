import { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import Cookies from './cookies';
import DiscordApi from './discord-api';

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
        return await sendUnauthorized(`no discord id`);
    
    const user = await prisma.user.findUnique({
        where: {
            discordId
        }
    });

    if (!user)
        return await sendUnauthorized(`no user found by discor id`);

    try {
        const dApi = new DiscordApi(user);
        await dApi.getMe();
        logger.debug('api validated successfully');
    } catch (e) {
        logger.error(e);
        return await sendUnauthorized(`couldnt validate api`);
    }

    done();

    async function sendUnauthorized(msg?: string) {
        return reply.code(401).send(msg || `Unauthorized.`);
    }
}