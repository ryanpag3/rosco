import { GuildMember, TextChannel } from 'discord.js';
import * as UserService from '../service/user';
import * as ServerService from '../service/server';
import { Server, ServerWelcomeMessage } from '@prisma/client';
import logger from '../util/logger';

const onGuildMemberAdd = async (member: GuildMember) => {
    logger.debug(`${member.user.tag} was added to ${member.guild.name} - ${member.guild.id}`);
    try {
        const server = await ServerService.initializeServer(member.guild);
        await UserService.initUser(member, server as Server); 
    
        for (const welcomeMessage of (server?.ServerWelcomeMessage || [])) {
            await sendWelcomeMessage(welcomeMessage, member);
        }
    } catch (e) {
        logger.error(e);
    }
}

const sendWelcomeMessage = async (welcomeMessage: ServerWelcomeMessage, member: GuildMember) => {
    if (!welcomeMessage.isEnabled)
        return;

    logger.info('sending welcome message');

    if (welcomeMessage.isPublic) {
        const c = await member.guild.channels.cache.get(welcomeMessage.channelId as string);
        await (c as TextChannel).send({
            embeds: [
                {
                    title: welcomeMessage.title as string,
                    description: welcomeMessage.message as string
                }
            ],
        })
    }

    if (!welcomeMessage.isPublic) {
        member.send({
            embeds: [
                {
                    title: welcomeMessage.title as string,
                    description: welcomeMessage.message as string
                }
            ]
        })
    } 
}

export default onGuildMemberAdd;