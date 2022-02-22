import { Server, User } from '@prisma/client';
import { CacheType, CommandInteraction, Message } from 'discord.js';
import { DateTime, Duration } from 'luxon';
import logger from '../util/logger';
import prisma from '../util/prisma';

export const onBannedWordDetected = async (message: Message, userId: string, serverId: string) => {
    try {
        logger.debug('banned word detected');

        const autoModRule = await prisma.autoModRule.findMany({
            where: {
                serverId,
                module: 'banned-words'
            }
        })

        const ruleUsers: any[] = [];
        for (const rule of autoModRule) {
            ruleUsers.push(await prisma.autoModRuleUser.upsert({
                where: {
                    userId_autoModRuleId: {
                        userId,
                        autoModRuleId: rule.id
                    }
                },
                create: {
                    userId,
                    autoModRuleId: rule.id,
                    currentViolations: 1,
                    cooldownExpiresOn: DateTime.now().plus(Duration.fromDurationLike({ seconds: rule.cooldownPeriodSecs })).toJSDate()
                },
                update: {
                    currentViolations: {
                        increment: 1
                    }
                },
                include: {
                    User: true,
                    Rule: {
                        include: {
                            Server: true
                        }
                    }
                }
            }))
        }

        for (const ruleUser of ruleUsers) {
            if (ruleUser.currentViolations < ruleUser.Rule.violations)
                continue;

            switch (ruleUser.Rule.action) {
                case 'delete':
                    return message.delete();
                case 'timeout':
                    return await timeoutUser(message, ruleUser.Rule.Server.discordId, ruleUser.User.discordId, ruleUser.Rule.duration);
            }
        }
    } catch (e) {
        logger.error(e);
    }
}

/**
 * TODO: look into whether we can just use client pointer from message object instead of this require()
 */
const timeoutUser = async (message: Message, serverDiscordId: string, userDiscordId: string, durationSecs: number) => {
    const { client } = message;
    const guild = await client.guilds.fetch(serverDiscordId);
    const member = await guild.members.fetch(userDiscordId);
    await member.timeout(durationSecs * 1000);
    logger.debug(`${member} has been timed out for ${durationSecs} seconds`);
}

export const toggleBannedWordsRule = async (interaction: CommandInteraction<CacheType>, user: User, server: Server, isEnabled: boolean) => {

    logger.debug(`setting banned words rule to ${isEnabled}`);

    await prisma.server.update({
        where: {
            id: server.id
        },
        data: {
            autoModBannedWordsEnabled: isEnabled
        }
    });

    return sendAutoModeToggledMessage(interaction, 'Banned Words', isEnabled);
}

const sendAutoModeToggledMessage = async (interaction: CommandInteraction<CacheType>, feature: string, isEnabled: boolean) => {
    return interaction.reply({
        embeds: [
            {
                title: 'AutoMod',
                description: `_${feature}_ rule has been **${isEnabled ? 'enabled' : 'disabled'}.**`
            }
        ]
    });
}