import { RouteHandlerMethod } from 'fastify';
import logger from '../../util/logger';
import DiscordApi from '../util/discord-api';
import DiscordPermission from '../util/discord-permission';

/**
 * Get information about the currently logged in user.
 */
export const getMe: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any; 
    const dApi = new DiscordApi(user);
    const me = await dApi.getMe();
    return reply.send({
        username: `${me?.username}#${me?.discriminator}`
    });
}

export const getMyGuilds: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { canManage } = request.query as any;
    const dApi = new DiscordApi(user);
    let guilds = await dApi.getMyGuilds();
    guilds = guilds.map((g) => {
        // https://discord.com/developers/docs/reference#image-formatting-image-base-url
        g.icon = g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}`: null;
        return g;
    })

    if (canManage) {
        guilds = guilds.filter((g) => DiscordPermission.has(g.permissions, DiscordPermission.MANAGE_GUILD))
    }

    return reply.headers({
        'Content-Type': 'application/json'
    }).send(JSON.stringify(guilds, null, 4));
};



