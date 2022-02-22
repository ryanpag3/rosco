import { ApplicationCommandOptionType } from 'discord-api-types';
import { CacheType, CommandInteraction } from 'discord.js';
import BotError from '../util/bot-error';

enum MODULE {
    BANNED_WORDS = 'banned-words',
    ALL_CAPS = 'all-caps'
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