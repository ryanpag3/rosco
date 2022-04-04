import { User } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { stringify } from 'querystring';
import logger from '../../util/logger';
import prisma from '../../util/prisma';

export default class DiscordApi {
    private user: User;
    private accessToken: string | undefined;

    constructor(user: User) {
        this.user = user;

        if (!this.user.refreshToken)
            throw new Error(`A valid refresh token is required to use Discord API.`);
    }

    getMe = async (): Promise<{
       id: string;
       username: string;
       avatar: string;
       discriminator: string;
       public_flags: number;
       flags: number;
       banner: string|null;
       banner_color: string|null;
       accent_color: string|null;
       locale: string;
       mfa_enabled: boolean;
       email: string;
       verified: boolean; 
    }> => {
        const { data } = await this.performRequest(async () => axios.get(
            'https://discordapp.com/api/v9/users/@me',
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            }), 0);

        return data;
    }

    performRequest = async (apiRequest: () => Promise<AxiosResponse<any, any>>,
        attempts: number, maxAttempts: number = 1): Promise<AxiosResponse<any, any>> => {
        try {
            logger.trace(`discord api request attempt ${attempts} of ${maxAttempts}`);
            if (!this.accessToken)
                await this.refreshAccessToken();
            return await apiRequest();
        } catch (e) {
            if (attempts > maxAttempts) {
                logger.error(e);
                throw new Error(`Could not make Discord API request within ${maxAttempts} attempts. Bailing!`);
            }
            await this.refreshAccessToken();
            return await this.performRequest(() => apiRequest(), ++attempts, maxAttempts);
        }
    }

    refreshAccessToken = async () => {
        const { data } = await axios.post(`https://discord.com/api/v9/oauth2/token`, stringify({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: this.user.refreshToken
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        this.accessToken = data.access_token;

        await prisma.user.update({
            where: {
                id: this.user.id
            },
            data: {
                refreshToken: data.refresh_token
            }
        })
    }
}