import { Permissions } from 'discord.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import client from '../..';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import Cookies from './cookies';
import * as jwt from './jwt';

export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
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

        const { guildId } = request.params as any;

        /**
         * Make sure the user is an admin for the guild to authenticate the request.
         */
        if (guildId) {
            const guild = await client.guilds.fetch(guildId);
            const member = await guild.members.fetch(user.discordId);
            if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                return reply.status(401).send();
            }
            const server = await prisma.server.findUnique({
                where: {
                    discordId: guild.id
                }
            });

            // @ts-ignore
            request.server = server;
        }

        // refresh token
        const newToken = jwt.create({ discordId: user.discordId });
        reply.setCookie(Cookies.IS_AUTHENTICATED, 'true', 
            {
                path: '/'
            })
            .setCookie(Cookies.JWT, newToken, {
                secure: true,
                httpOnly: true,
                path: '/'
            });
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

async function sendUnauthorized(reply: FastifyReply, msg?: string) {
    return reply.code(401).send(msg || `Unauthorized.`);
}