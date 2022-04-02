import axios from 'axios';
import { RouteHandlerMethod } from 'fastify';
import { stringify } from 'querystring';
import logger from '../../util/logger';

/**
 * Initiate an oauth authorization code flow with Discord
 */
export const login: RouteHandlerMethod = async (request, reply) => {
    const scopes = ['identify'].join(' ');
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.DISCORD_CLIENT_ID,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
        scope: scopes
    } as any);
    reply.redirect(`https://discordapp.com/oauth2/authorize?${params}`);
}

export const callback: RouteHandlerMethod = async (request, reply) => {
    const { data } = await axios.post(
        "https://discordapp.com/api/v9/oauth2/token",
        stringify({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: (request.query as any).code,
            redirect_uri: process.env.DISCORD_REDIRECT_URI
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );

    logger.info(data);

    reply.send(200);
}
