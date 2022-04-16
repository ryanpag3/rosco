import { RouteHandlerMethod } from 'fastify';
import logger from '../../util/logger';
import DiscordApi from '../util/discord-api';

/**
 * Get guild metadata
 */
export const getGuild: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { id } = request.params as any;
    try {
        const api = new DiscordApi(user);
        let guild = await api.getGuild(id);
        reply.headers({
            'Content-Type': 'application/json'
        }).send(JSON.stringify(guild));
    } catch (e) {
        if ((e as any).message.includes('status code 403'))
            return reply.status(403).send();
        throw e;
    }
}