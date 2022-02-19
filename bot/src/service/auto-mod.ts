import { ApplicationCommandOptionType } from 'discord-api-types';
import { CacheType, CommandInteraction } from 'discord.js';

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