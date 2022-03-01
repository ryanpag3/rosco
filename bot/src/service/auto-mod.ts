import { Server, AutoModRuleUser, User, AutoModRule } from '@prisma/client';
import { ApplicationCommandOptionType } from 'discord-api-types';
import { CacheType, CommandInteraction, Message } from 'discord.js';
import { DateTime, Duration } from 'luxon';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import prisma from '../util/prisma';

enum MODULE {
    BANNED_WORDS = 'banned-words',
    ALL_CAPS = 'capslock-detect'
}

enum ACTION {
    DELETE = 'delete',
    WARN = 'warn',
    TIMEOUT = 'timeout',
    KICK = 'kick',
    BAN = 'ban'
}

export const validateModuleAndAction = (module: string, action: string) => {
    if (!Object.values(MODULE).some((v) => v === module))
        throw new BotError('Invalid module provided. Valid options are: \n' + Object.values(MODULE).join('\n'));

    if (!Object.values(ACTION).some((v) => v === action))
        throw new BotError('Invalid action provided. Valid options are: \n' + Object.values(ACTION).join('\n'));
}

export const RuleBuilderOptions = [
    {
        name: 'action',
        description: 'The action to take when the rule is broken. Can be either "mute", "kick", or "ban".',
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: 'duration',
        description: 'The duration, in seconds, to take action on the user when the rule is broken.',
        type: ApplicationCommandOptionType.Integer,
        required: true
    },
    {
        name: 'violations',
        description: 'The amount of violations to allow before taking action on the user.',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }
];

export const getRuleOptions = (interaction: CommandInteraction<CacheType>) => {
    const action = interaction.options.getString('action', true);
    const duration = interaction.options.getInteger('duration', true);
    const violations = interaction.options.getInteger('violations', true);

    return {
        action,
        duration,
        violations
    };
};


export const toggleAutoModModule = async (interaction: CommandInteraction<CacheType>, server: Server, serverProperty: string, isEnabled: boolean) => {
    logger.debug(`setting ${serverProperty} to ${isEnabled} for server ${server.id}`);

    await prisma.server.update({
        where: {
            id: server.id
        },
        data: {
            [serverProperty]: isEnabled
        }
    });

    return sendToggleAutoModModule(interaction, serverProperty, isEnabled);
}

const sendToggleAutoModModule = async (interaction: CommandInteraction<CacheType>, serverProperty: string, isEnabled: boolean) => {
    let plainEnglishModule = 'module';

    switch (serverProperty) {
        case 'autoModBannedWordsEnabled':
            plainEnglishModule = 'Banned Words';
            break;
        case 'autoModCapslockDetectEnabled':
            plainEnglishModule = 'Capslock Detection';
            break;
    }

    return interaction.reply({
        embeds: [
            {
                title: ':traffic_light: An AutoMod module has been toggled.',
                fields: [
                    {
                        name: 'module',
                        value: plainEnglishModule
                    },
                    {
                        name: 'enabled?',
                        value: isEnabled.toString()
                    }
                ]
            }
        ]
    })
}

export const onAutoModRuleBroken = async (module: string, message: Message, userId: string, serverId: string) => {
    logger.trace(`${userId} broke the ${module} module in ${serverId} server.`);

    try {
        const autoModRules = await prisma.autoModRule.findMany({
            where: {
                module,
                serverId
            }
        });

        const ruleUsers: any[] = [];
        for (const rule of autoModRules) {
            ruleUsers.push(await upsertAutoModRuleUser(userId, rule.id, rule.cooldownPeriodSecs));
        }

        await takeAction(message, ruleUsers);
      } catch (e) {
        logger.error(e);
    }

    throw new Error(`An AutoMod action was taken for ${message.id}`);
};

const upsertAutoModRuleUser = async (userId: string, ruleId: string, ruleCooldownPeriod: number) => {
    const user = await prisma.autoModRuleUser.upsert({
        where: {
            userId_autoModRuleId: {
                userId,
                autoModRuleId: ruleId
            }
        },
        create: {
            userId,
            autoModRuleId: ruleId,
            currentViolations: 1,
            cooldownExpiresOn: DateTime.now().plus(Duration.fromDurationLike({ seconds: ruleCooldownPeriod })).toJSDate()
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
    });

    return user;
}

const takeAction = async (message: Message, ruleUsers: AutoModRuleUser[]) => {

    for (const ruleUser of ruleUsers) {
        const u: AutoModRuleUser & {
            User: User;
            Rule: AutoModRule & {
                Server: Server;
            };
        } = ruleUser as any;

        // @ts-ignore
        if (ruleUser.currentViolations < u.Rule.violations) {
            continue;
        }

        switch(u.Rule.action) {
            case 'delete':
                return message.delete();
            case 'timeout':
                return timeoutUser(message, u.Rule.Server.discordId, u.User.discordId, u.Rule.duration);
        }
    }
}

const timeoutUser = async (message: Message, serverDiscordId: string, userDiscordId: string, durationSecs: number) => {
    const { client } = message;
    const guild = await client.guilds.fetch(serverDiscordId);
    const member = await guild.members.fetch(userDiscordId);
    await member.timeout(durationSecs * 1000);
    logger.debug(`${member} has been timed out for ${durationSecs} seconds`);
};
