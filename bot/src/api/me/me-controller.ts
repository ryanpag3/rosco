import { RouteHandlerMethod } from 'fastify';
import DiscordApi from '../util/discord-api';

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
    const dApi = new DiscordApi(user);
    let guilds = await dApi.getMyGuilds();
    guilds = guilds.map((g) => {
        // https://discord.com/developers/docs/reference#image-formatting-image-base-url
        g.icon = g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}`: null;
        return g;
    })
    return reply.headers({
        'Content-Type': 'application/json'
    }).send(JSON.stringify(guilds, null, 4));
};