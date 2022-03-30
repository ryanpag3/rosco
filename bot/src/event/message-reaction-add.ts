import { Server } from '@prisma/client';
import { MessageReaction, PartialMessageReaction, PartialUser, User as DiscordUser } from 'discord.js';
import * as ServerService from '../service/server';
import * as UserService from '../service/user';

export const onMessageActionAdd = async (
    reaction: MessageReaction|PartialMessageReaction, 
    user: DiscordUser|PartialUser) => {

    const server = await ServerService.initializeServer(reaction.message.guild);

    await UserService.initUser(reaction.message.member as any, server as Server);
}