import { APIInteractionGuildMember } from 'discord-api-types';
import { CurrencyRule as PrismaCurrencyRule } from '@prisma/client';
import { CacheType, Guild, GuildMember, Interaction, Message, MessageReaction, PartialMessage, PartialMessageReaction } from 'discord.js'
import logger from '../util/logger';
import prisma from '../util/prisma';

export interface CurrencyRule {
    role: string;
    action: CurrencyAction;
    amount: number;
    filter?: string 
}


// keep in sync with prisma.schema
export enum CurrencyAction {
    COMMAND = 'COMMAND',
    MESSAGE = 'MESSAGE',
    REACTION = 'REACTION',
}

export const DefaultCurrencyRule: CurrencyRule[] = [
    {
        role: '@everyone',
        action: CurrencyAction.COMMAND,
        amount: 1
    },
    {
        role: '@everyone',
        action: CurrencyAction.MESSAGE,
        amount: 1 
    },
    {
        role: '@everyone',
        action: CurrencyAction.REACTION,
        amount: 1
    }
]

export const handleCurrencyEvent = async (
    action: CurrencyAction, 
    payload: Interaction<CacheType>|Message<any>|PartialMessage, 
    reaction?: MessageReaction|PartialMessageReaction
) => {
    const { member, guild } = payload;
    
    const currencyRules = await prisma.currencyRule.findMany({
        where: {
            Server: {
                discordId: guild?.id
            }
        }
    });

    logger.info(currencyRules);

    const promises = [];
    for (const currencyRule of currencyRules) {
        // @ts-ignore
        logger.info(member?.roles.cache.has(currencyRule.roleId));
        // @ts-ignore
        if (member?.roles.cache.has(currencyRule.roleId))
            await runEvent(currencyRule, guild, member as GuildMember)
    }
}

export const runEvent = async (
    currencyRule: PrismaCurrencyRule, 
    guild: Guild|null, 
    member: GuildMember) => {
        const user = await prisma.user.findUnique({
            where: {
                discordId: member.id
            }
        });

        const server = await prisma.server.findUnique({
            where: {
                discordId: guild?.id
            }
        });

        await prisma.user.update({
            where: {
                discordId: member.id
            },
            data: {
                serverCurrencyCount: (user?.serverCurrencyCount || 0) + currencyRule.amount
            }
        });

        await prisma.currencyHistoryLog.create({
            data: {
                serverId: server?.id as any,
                delta: currencyRule.amount,
                currencyRuleId: currencyRule.id
            }
        });
}