import { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import Cookies from './cookies';
import * as jwt from './jwt';

export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies[Cookies.JWT];

    if (!token) {
        return await sendUnauthorized(reply)
    }

    const { discordId } = jwt.validateJWT(token);

    const user = await prisma.user.findUnique({
        where: {
            discordId
        }
    });

    if (!user) {
        return await sendUnauthorized(reply);
    }

    // @ts-ignore
    request.user = user;
}

async function sendUnauthorized(reply: FastifyReply, msg?: string) {
    return reply.code(401).send(msg || `Unauthorized.`);
}