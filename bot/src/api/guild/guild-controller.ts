import { getTimezone } from 'countries-and-timezones';
import { RouteHandlerMethod } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import DiscordApi from '../util/discord-api';

/**
 * Get guild metadata
 */
export const getGuild: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { guildId } = request.params as any;
    try {
        const api = new DiscordApi(user);
        let guild = await api.getGuild(guildId);
        reply.headers({
            'Content-Type': 'application/json'
        }).send(JSON.stringify(guild));
    } catch (e) {
        if ((e as any).message.includes('status code 403'))
            return reply.status(403).send();
        throw e;
    }
}

export const updateGuildTimezone: RouteHandlerMethod = async (request, reply) => {
    const { guildId } = request.params as any;
    const { timezone } = request.query as any;

    if (!getTimezone(timezone))
        return reply.status(400).send(`Invalid timezone provided.`);

    await prisma.server.update({
        where: {
            discordId: guildId
        },
        data: {
            timezone
        }
    });

    reply.status(200).send();
};