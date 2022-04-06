import { Keyword, Server, User } from '@prisma/client';
import { Message } from 'discord.js';
import logger from '../util/logger';
import prisma from '../util/prisma';
import * as ServerService from '../service/server';
import * as UserService from '../service/user';
import { onAutoModRuleBroken } from '../service/auto-mod';
import LinkCache from '../service/link-cache';
import KeywordCache from '../service/keyword-cache';
import BannedWordCache from '../service/banned-word-cache';

const onMessageReceived = async (message: Message) => {
    if (message.type === 'APPLICATION_COMMAND')
        return;

    if (message.member?.user.bot)
        return;

    const server = await ServerService.initializeServer(message.guild);

    const user = await UserService.initUser(message.member as any, server as Server);

    await validateAutoMod(message, user, server as Server);

    await handleKeywords(message, server);
};

const validateAutoMod = async (message: Message, user: User, server: Server) => {
    try {
        // @ts-ignore
        if (server.ServerAutoModIgnoredRole.some((r) => {
            return message.member?.roles.cache.has(r.roleId)
        })) {
            logger.trace('user has AutoMod ignore role.');
            return true;
        }

        if (await BannedWordCache.containsCachedWord(server.id, message.content)) {
            await onAutoModRuleBroken('banned-words', message, user.id, server.id);
        }

        const numberUppercase = message.content.length - message.content.replace(/[A-Z]/g, '').length
        if (server.autoModCapslockDetectEnabled === true && 
                server.autoModCapslockDetectLength > numberUppercase) {
            await onAutoModRuleBroken('capslock-detect', message, user.id, server.id);
        }

        // links are only valid if on the approved list
        if (server.autoModLinkDetectEnabled === true && 
            // @ts-ignore
            await LinkCache.containsInvalidLink(server.id, message.content) === true) {
                await onAutoModRuleBroken('link-detect', message, user.id, server.id);
        }
    } catch (e: any) {
        if (e.message.toString().contains('An AutoMod rule'))
            return;
        logger.error(e);
    }
}

const handleKeywords = async (message: Message, server: Server|any) => {

    const containsKeyword = await KeywordCache.containsCachedWord(server.id, message.content);

    if (!containsKeyword) {
        logger.debug('message does not contain keyword');
        return;
    }

    const keywords: Keyword[] = await KeywordCache.getCachedRecords(server.id) as Keyword[];

    for (const k of keywords) {
        if (k.channelId && k.channelId !== message.channel?.id)
            continue;

        const action = k.action === 'UP' ? 'increment' : 'decrement';

        if (k.roleId !== null && !message.member?.roles.cache.has(k.roleId)) {
            continue;
        }

        try {
            const s = await prisma.score.update({
                where: {
                    id: k.scoreId
                },
                data: {
                    amount: {
                        [action]: k.amount
                    }
                }
            });

            logger.debug(`${action}ed ${s.name} by ${k.amount} in ${s.serverId}`);
        } catch (e) {
            logger.error(e);
        }
    }
}

export default onMessageReceived;