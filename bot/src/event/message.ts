import { Keyword, Server, User } from '@prisma/client';
import { Message, TextChannel } from 'discord.js';
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

    // if performance is hit, we can always cache server flags in redis
    // and move this below the if gate
    const server = await ServerService.initializeServer(message.guild);

    if (message.member?.user.bot && server?.botToBotMessagesEnabled === false)
        return;

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

const handleKeywords = async (message: Message, server: Server | any) => {

    const containsKeyword = await KeywordCache.containsCachedWord(server.id, message.content);

    if (!containsKeyword) {
        logger.trace('message does not contain keyword');
        return;
    }

    const keywords: Keyword[] = await KeywordCache.getMatchingCachedRecords(server.id, message.content) as Keyword[];

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

            if (k.announceChannelId) {
                const channel = message.guild?.channels.cache.get(k.announceChannelId) as TextChannel;
                await channel.send({
                    embeds: [
                        {
                            title: `:point_right: A keyword has been triggered.`,
                            description: `The score **${s.name}** has been ${action}ed by **${k.amount}**.`,
                            fields: [
                                {
                                    name: 'keyword or phrase',
                                    value: k.word
                                },
                                {
                                    name: 'name',
                                    value: (k as any).name,
                                }
                            ]
                        }
                    ]
                });
            }
        } catch (e) {
            logger.error(e);
        }
    }
}


export default onMessageReceived;