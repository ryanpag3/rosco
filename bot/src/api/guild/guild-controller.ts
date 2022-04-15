import { RouteHandlerMethod } from 'fastify';
import logger from '../../util/logger';
import { getLoginUrl } from '../auth/auth-controller';
import DiscordApi from '../util/discord-api';

export const getGuild: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { id } = request.params as any;

    const api = new DiscordApi(user);
    let guild = await api.getGuild(id);
    reply.headers({
        'Content-Type': 'application/json'
    }).send(JSON.stringify(guild));
}