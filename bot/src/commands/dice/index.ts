import { ApplicationCommandOptionType } from 'discord-api-types';
import { CacheType, CommandInteraction } from 'discord.js';
import { command } from 'execa';
import { Command } from '../../../types/command';
import logger from '../../util/logger';

const DiceDefinitions = {
    D20: 'D20',
    D12: 'D12',
    D10: 'D10',
    D8: 'D8',
    D6: 'D6',
    DX: 'DX'
}

const DiceSubCommandOptions = [
    {
        name: 'amount',
        description: 'The amount of dice you want to roll.',
        type: ApplicationCommandOptionType.Integer
    }
]

const Dice: Command = {
    id: '3318a9e2-9e0d-4ef6-bcdf-8e1ae1445f0a',
    name: 'dice',
    description: 'Roll one or more dice.',
    options: [
        {
            name: 'types',
            description: 'One or more definitions of dice as a comma-separated string. Ex. D20,D20,D6,D6',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    handler: async (interaction, server, user) => {
        const types = interaction.options.getString('types', true);
        const split = types.split(",").map(t => t.trim());
        const amounts = split.map(s => {
            const potentialError = new Error(`${s} is not a valid dice definition.`);
            try {
                const amountStr = s.split('D')[1];

                if (isNaN(Number.parseInt(amountStr))) {
                    throw potentialError;
                }

                return Number.parseInt(amountStr);
            } catch (e) {
                throw potentialError;                
            }
        });

        const results = [];
        for (const amount of amounts) {
            results.push(getRandomInt(amount));
        }

        return interaction.reply({
            embeds: [
                {
                    description: `**Dice** - **Result**
                    ${results.map((r, i) => {
                        return `\`${split[i]}\` - ${r}`
                    }).join('\n')}`
                }
            ]
        });
    }
}

const getSides = (interaction: CommandInteraction<CacheType>): number => {
    const commandName = interaction.options.getSubcommand();
    const split = commandName.split('D');
    const amountStr = split[1];

    if (amountStr === 'X') {
        const amount = interaction.options.getInteger('sides', true);
        return amount;
    }

    return Number.parseInt(amountStr);
}

/**
 * Get a random number between 1 and max
 */
const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) + 1;
}

export default Dice;