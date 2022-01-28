import { GuildMember } from 'discord.js';
import * as UserService from '../service/user';
import * as ServerService from '../service/server';
import { Server } from '@prisma/client';
import logger from '../util/logger';

const onGuildMemberAdd = async (member: GuildMember) => {
    logger.debug(`${member.user.tag} was added to ${member.guild.name} - ${member.guild.id}`);

    const server = await ServerService.initializeServer(member.guild);
    const user = await UserService.initUser(member, server as Server); 

    

}

export default onGuildMemberAdd;