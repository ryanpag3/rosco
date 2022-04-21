import { getTimezone } from 'countries-and-timezones';
import { RouteHandlerMethod } from 'fastify';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import DiscordApi from '../util/discord-api';
import COMMANDS from '../../recursive-commands';
import client from '../..';

/**
 * Get guild metadata
 */
export const getGuild: RouteHandlerMethod = async (request, reply) => {
    const { user } = request as any;
    const { guildId } = request.params as any;
    try {
        const api = new DiscordApi(user);
        let guildRes = await api.getGuild(guildId);
        const guild = await prisma.server.findUnique({
            where: {
                discordId: guildId
            }
        });

        reply.headers({
            'Content-Type': 'application/json'
        }).send(JSON.stringify({
            id: guildRes.id,
            name: guildRes.name,
            label: guildRes.name,
            timezone: guild.timezone
        }));
    } catch (e) {
        if ((e as any).message.includes('status code 403'))
            return reply.status(403).send();
        logger.error(e);
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

/**
 * Send the list of permissions with applicable set permissions.
 */
export const getPermissions: RouteHandlerMethod = async (request, reply) => {
    const { guildId } = request.params as any;

    const permissions = await prisma.permission.findMany({
        where: {
            Server: {
                discordId: guildId
            }
        }
    });

    const mappedFromDb: any = {};

    permissions.forEach((permission) => {
        if (!mappedFromDb[permission.commandId]) mappedFromDb[permission.commandId] = [];
        mappedFromDb[permission.commandId].push(permission) 
    });

    const permissionList = Object.keys(COMMANDS).map((key) => {
        const cmd = COMMANDS[key];
        const roles: any = [];
        
        if (mappedFromDb[cmd.id]) {
            for (const p of mappedFromDb[cmd.id]) {
                const guild = client.guilds.cache.find((guild) => guild.id === guildId);
                const role = guild?.roles.cache.find((role) => role.id === p.roleId);
                logger.debug(`found saved permission, resolved role to ${JSON.stringify(role, null, 4)}`);
                roles.push({
                    id: role?.id,
                    name: role?.name,
                    color: role?.color !== 0 ? 
                                "#" + role?.color.toString(16).padStart(6, '0') 
                                : 
                                undefined
                });
            }
        }

        return {
            id: cmd.id,
            name: cmd.name,
            roles
        }
    });

    if (permissionList.length === 0) {
        return reply.status(500).send();
    }

    return reply.status(200).headers({
        'Content-Type': 'application/json'
    }).send(JSON.stringify(permissionList));
}