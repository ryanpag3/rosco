import { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import Cookies from './cookies';
import DiscordApi from './discord-api';
import DiscordPermission from './discord-permission';
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

    const { guildId } = request.params as any;

    /**
     * Make sure the user is an admin for the guild to authenticate the request.
     */
    if (guildId) {
        const api = new DiscordApi(user)
        const [ guild ] = (await api.getMyGuilds()).filter((guild) => guild.id === guildId)
        if (!DiscordPermission.has(guild.permissions, DiscordPermission.ADMINISTRATOR))
            return reply.status(401).send();
    }
}

async function sendUnauthorized(reply: FastifyReply, msg?: string) {
    return reply.code(401).send(msg || `Unauthorized.`);
}