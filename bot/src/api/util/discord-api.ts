import { User } from '@prisma/client';
import Axios, { AxiosInstance } from 'axios';
import { DateTime } from 'luxon';
import { stringify } from 'querystring';
import logger from '../../util/logger';
import redis from '../../util/redis';

export default class DiscordApi {
    private user: User;
    private axios: AxiosInstance;

    constructor(user: User) {
        this.user = user;
        this.axios = Axios.create({
            baseURL: 'https://discordapp.com/api'
        })
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

     getGuild = async (id: string) => {
         logger.trace(`getting guild with id ${id}`);
         const { data } = await this.axios.get(`/guilds/${id}`, {
            params: {
                with_counts: true
            },
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            }
        });
        return data; 
     }

    /**
     * Get the access token from the cache and refresh it if need be.
     */
    getAccessToken = async () => {
        let token = await redis.get(this.getCacheId());

        if (token) {
            token = JSON.parse(token);
        }

        if (!token || DateTime.now() > DateTime.fromJSDate((token as any).expiresAt)) {
            token = await this.refreshAuth() as any;
        }

        logger.trace(`got access token for ${this.user.id}`);

        return (token as any).accessToken;
    }

    /**
     * Exchange the current refresh token for a new refresh token & access token.
     */
    refreshAuth = async () => {
        const { data }: {
            data: {
                refresh_token: string;
                access_token: string;
                expires_in: number;
            }
        } = await this.axios.post(`/oauth2/token`, stringify({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: this.user.refreshToken
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const token = {
            accessToken: data.access_token,
            expiresAt: DateTime.now().plus({
                milliseconds: data.expires_in
            }).toJSDate()
        };

        this.cacheAccessToken(token);

        logger.debug(`refreshed auth for ${this.user.id}`);

        return token;
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
}