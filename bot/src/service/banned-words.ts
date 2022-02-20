import { Server, User } from '@prisma/client';
import { CacheType, CommandInteraction, Message } from 'discord.js';
import { DateTime, Duration } from 'luxon';
import logger from '../util/logger';
import prisma from '../util/prisma';

export const onBannedWordDetected = async (message: Message, userId: string, serverId: string) => {
    logger.info('banned word detected');

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
            }
        }))
    }

    logger.info(ruleUsers);
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