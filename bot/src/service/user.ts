import { Server } from '@prisma/client';
import { GuildMember } from 'discord.js';
import prisma from '../util/prisma';

// TODO: add UserServer relationship to an existing user record in the case
// that the user first logged in via the web app
export const initUser = async (member: GuildMember, server: Server) => {
    return prisma.user.upsert({
        where: {
            discordId: member.user?.id as string
        },
        update: {},
        create: {
            discordId: member.user?.id as string,
            UserServer: {
                create: [
                    {
                        currencyCount: 0,
                        serverId: server?.id as string
                    }
                ]
            }
        },
        include: {
            UserServer: {
                where: {
                    serverId: server.id
                }
            }
        }
    });
}