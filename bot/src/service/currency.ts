import { CurrencyRule as PrismaCurrencyRule, Prisma } from '@prisma/client';
import { CacheType, Guild, GuildMember, Interaction, Message, MessageReaction, PartialMessage, PartialMessageReaction, PartialUser, User as DiscordUser } from 'discord.js'
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
    payload: Interaction<CacheType> | Message<any> | PartialMessage,
    reaction?: MessageReaction | PartialMessageReaction,
    user?: DiscordUser | PartialUser
) => {

    try {
        let { member, guild } = payload;

        const currencyRules = await prisma.currencyRule.findMany({
            where: {
                action,
                Server: {
                    discordId: guild?.id
                }
            }
        });

        const promises = [];
        for (const currencyRule of currencyRules) {
            // @ts-ignore
            if (member?.roles.cache.has(currencyRule.roleId))
                logger.debug(`granting ${member.user.id} ${currencyRule.amount}`);
            promises.push(runEvent(currencyRule, guild, member as GuildMember, reaction, user))
        }

        return Promise.all(promises);
    } catch (e) {
        logger.error(e);
    }
}

export const runEvent = async (
    currencyRule: PrismaCurrencyRule,
    guild: Guild | null,
    member: GuildMember,
    reaction?: MessageReaction | PartialMessageReaction,
    discordUser?: DiscordUser | PartialUser) => {
    
    const discordId = discordUser ? discordUser.id : member.id;
    
    const user = await prisma.user.findUnique({
        where: {
            discordId
        }
    });

    if (!user)
        throw new Error('Cannot find user to adjust currency.');

    const server = await prisma.server.findUnique({
        where: {
            discordId: guild?.id
        },
        include: {
            UserServer: {
                where: {
                    userId: user?.id
                }
            }
        }
    });

    await prisma.userServer.update({
        where: {
            userId_serverId: {
                userId: user?.id as string,
                serverId: server?.id as string
            }
        },
        data: {
            currencyCount: (server?.UserServer[0].currencyCount || 0) + currencyRule.amount
        }
    });

    await prisma.currencyHistoryLog.create({
        data: {
            serverId: server?.id as any,
            delta: currencyRule.amount,
            currencyRuleId: currencyRule.id,
            receiverId: user?.id as string,
            reaction: reaction?.emoji.name,
            messageId: reaction?.message.id
        }
    });
}

export const undoMessageReactionIncome = async (reaction: MessageReaction | PartialMessageReaction, discordUser: DiscordUser | PartialUser) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                discordId: discordUser.id
            },
            rejectOnNotFound: true
        });
        
        const log = await prisma.currencyHistoryLog.findUnique({
            where: {
                receiverId_reaction_messageId: {
                    receiverId: user?.id as string,
                    reaction: reaction.emoji.name as string,
                    messageId: reaction.message.id
                }
            },
            include: {
                currencyRule: true
            },
            rejectOnNotFound: true
        });

        await prisma.userServer.update({
            where: {
                userId_serverId: {
                    userId: user?.id as string,
                    serverId: log?.serverId as string
                }
            },
            data: {
                currencyCount: {
                    increment: (log.currencyRule?.amount || 0) * -1
                }
            }
        });

        logger.debug(`Reversed amount earned [${log.currencyRule?.amount}] by ${user.id} for reaction message.`)

    } catch (e) {
        logger.error(e);
        throw e;
    }
}