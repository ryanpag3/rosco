import { User } from '@prisma/client';
import Axios, { AxiosInstance } from 'axios';
import { DateTime } from 'luxon';
import { stringify } from 'querystring';
import FormData from 'form-data';
import DiscordOauth2 from 'discord-oauth2';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import redis from '../../util/redis';
import DiscordScopes from './discord-scopes';
import DiscordApiCache from './discord-api-cache';
import Bluebird from 'bluebird';

export default class DiscordApi {
    // @ts-ignore
    private user: User;
    // @ts-ignore
    private axios: AxiosInstance;

    private token: any;

    private isUpdatingToken: boolean = false;

    constructor(user: User) {
        if (DiscordApiCache[user.id]) {
            return DiscordApiCache[user.id];
        }
        
        this.user = user;
        this.axios = Axios.create({
            baseURL: 'https://discordapp.com/api'
        });
        DiscordApiCache[user.id] = this;
    }

    getMe = async (): Promise<{
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: number;
        flags: number;
        banner: string | null;
        banner_color: string | null;
        accent_color: string | null;
        locale: string;
        mfa_enabled: boolean;
        email: string;
        verified: boolean;
    } | undefined> => {
        logger.trace(`get me request by ${this.user.id}`);
        const accessToken = await this.getAccessToken();
        logger.debug(`get me request for ${this.user.id} with token ${accessToken}`);
        const { data } = await this.axios.get('/v9/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }

    getMyGuilds = async (): Promise<{
        id: string;
        name: string;
        icon: string | null;
        owner: boolean;
        permissions: string;
        features: string[];
    }[]> => {
        logger.trace(`get my guilds request by ${this.user.id}`);
        const accessToken = await this.getAccessToken();
        const { data } = await this.axios.get('/v9/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }

    getMyGuildMember = async (guildId: string) => {
        const accessToken = await this.getAccessToken();
        const { data } = await this.axios.get(`/v9/users/@me/guilds/${guildId}/member`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }

    getGuildMember = async (guildId: string, userDiscordId: string) => {
        const { data } = await this.axios.get(`/guilds/${guildId}/members/${userDiscordId}`, {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            }
        });
        return data;
    }

    getGuild = async (id: string, asUser: boolean = false) => {
        logger.trace(`getting guild with id ${id}`);
        let headers = {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        }

        if (asUser) {
            const accessToken = await this.getAccessToken();
            headers = {
                Authorization: `Bearer ${accessToken}`
            };
        }

        const { data } = await this.axios.get(`/v9/guilds/${id}`, {
            params: {
                with_counts: true
            },
            headers
        });
        return data;
    }

    /**
     * Get the access token from the cache and refresh it if need be.
     */
    getAccessToken = async () => {
        let isTimeout = false;
        setTimeout(() => isTimeout = true, 5000);
        while (this.isUpdatingToken && !isTimeout) {
            await Bluebird.delay(50);
        }

        let token = this.token || await redis.get(this.getCacheId());

        if (token && !this.token) {
            token = JSON.parse(token);
        }

        if (!token || DateTime.now() > DateTime.fromJSDate((token as any).expiresAt)) {
            token = await this.refreshAuth() as any;
        } else {
            logger.debug(`token retrieved from redis cache. user ID: ${this.user.id}`);
        }

        return (token as any).accessToken;
    }

    /**
     * Exchange the current refresh token for a new refresh token & access token.
     */
    refreshAuth = async () => {
        try {
            // may need to abstract to redis or enable sticky sessions
            this.isUpdatingToken = true;

            const oauth = new DiscordOauth2({
                clientId: process.env.DISCORD_CLIENT_ID,
                clientSecret: process.env.DISCORD_CLIENT_SECRET,
                redirectUri: process.env.DISCORD_REDIRECT_URI
            });

            const data = await oauth.tokenRequest({
                refreshToken: this.user.refreshToken as string,
                grantType: 'refresh_token',
                scope: DiscordScopes
            });

            this.token = {
                accessToken: data.access_token,
                expiresAt: DateTime.now().plus({
                    milliseconds: data.expires_in
                }).toJSDate()
            };

            // can only use one refresh token per access token
            // this may end up requiring sticky sessions
            this.user = await prisma.user.update({
                where: {
                    id: this.user.id
                },
                data: {
                    refreshToken: data.refresh_token
                }
            });

            await this.cacheAccessToken(this.token);

            this.isUpdatingToken = false;

            logger.debug(`refreshed auth for ${this.user.id}`);

            return this.token;
        } catch (e) {
            logger.error(`An error was thrown from refreshAuth()`, e);
            throw e;
        }
    }

    /**
     * Cache the access token in Redis so all nodes can use it.
     */
    cacheAccessToken = async (token: {
        accessToken: string;
        expiresAt: Date;
    }) => {
        return redis.set(this.getCacheId(), JSON.stringify(token));
    }

    getCacheId = () => {
        return `discord.${this.user.id}.accessToken`;
    }

    /**
     * Reset access token. 
     * 
     * Useful in cases where the API rejected us and we didn't expect it.
     */
    clearAccessToken = async () => {
        return redis.unlink(this.getCacheId());
    }
}