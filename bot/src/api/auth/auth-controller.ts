import axios from 'axios';
import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import { stringify } from 'querystring';
import prisma from '../../util/prisma';
import Cookies from '../util/cookies';
import * as jwt from '../util/jwt';

export const getLoginUrl = () => {
    const scopes = ['identify', 'email', 'guilds', 'guilds.members.read'].join(' ');

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.DISCORD_CLIENT_ID,
        redirect_uri: process.env.DISCORD_REDIRECT_URI,
        scope: scopes
    } as any);

    return `https://discordapp.com/oauth2/authorize?${params}`;
}

/**
 * Initiate an oauth authorization code flow with Discord
 */
export const login: RouteHandlerMethod = async (request, reply) => {
    reply.redirect(getLoginUrl());
}

export const callback: RouteHandlerMethod = async (request, reply) => {

    // @ts-ignore
    if (request?.query?.error) {
        reply.redirect(process.env.LANDING_ADDRESS as string); 
    }

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

    const { data: user } = await axios.get('https://discordapp.com/api/v9/users/@me', {
        headers: {
            Authorization: `Bearer ${data.access_token}`
        }
    });

    if (user.email === null) {
        return reply.status(400).send(`Please verify your Discord account login email before proceeding.`);
    }

    await prisma.user.upsert({
        where: {
            discordId: user.id
        },
        update: {
            email: user.email,
            refreshToken: data.refresh_token
        },
        create: {
            discordId: user.id,
            email: user.email,
            refreshToken: data.refresh_token
        }
    });

    const token = jwt.create({ discordId: user.id });

    reply
        .setCookie(Cookies.IS_AUTHENTICATED, 'true')
        .setCookie(Cookies.JWT, token, {
            secure: true,
            httpOnly: true,
            domain: process.env.JWT_DOMAIN
        })
        .redirect(process.env.WEB_APP_ADDRESS as string);
}

export const logout: RouteHandlerMethod = async (request, reply) => {
    return reply
        .clearCookie(Cookies.JWT)
        .clearCookie(Cookies.IS_AUTHENTICATED)
        .send(200);
}
