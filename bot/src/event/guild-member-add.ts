import { GuildMember, TextChannel } from 'discord.js';
import * as UserService from '../service/user';
import * as ServerService from '../service/server';
import { Server } from '@prisma/client';
import logger from '../util/logger';

const onGuildMemberAdd = async (member: GuildMember) => {
    logger.debug(`${member.user.tag} was added to ${member.guild.name} - ${member.guild.id}`);
    try {
        const server = await ServerService.initializeServer(member.guild);
        await UserService.initUser(member, server as Server); 
    
        if (server?.privateWelcomeMessageEnabled) {
            await sendWelcomeMessage(false, server, member);
        }
    
        if (server?.publicWelcomeMessageEnabled) {
            await sendWelcomeMessage(true, server, member);
        }
    } catch (e) {
        logger.error(e);
    }
}

const sendWelcomeMessage = async (publicMessage: boolean, server: Server, member: GuildMember) => {
    logger.info('sending welcome message');
    
    if (publicMessage) {
        const c = await member.guild.channels.cache.get(server.publicWelcomeMessageChannelId as string);
        await (c as TextChannel).send({
            embeds: [
                {
                    description: server.publicWelcomeMessage as string
                }
            ],
        })
    }

    if (!publicMessage) {
        const c = await member.guild.channels.cache.get(server.privateWelcomeMessageChannelId as string);
        await (c as TextChannel).send({
            embeds: [
                {
                    description: server.privateWelcomeMessage as string
                }
            ]
        })
    } 
}

export default onGuildMemberAdd;