import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import * as ScoreService from '../service/score';

const ScoreCreate: Command = {
    name: 'create',
    description: 'Create a score.',
    examples: ``,
    // options for this subcommand are located in score.ts
    options: {},
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const amount = interaction.options.getInteger('amount') || 0;

        if (!name)
            throw new BotError(`Name is a required field.`);

        if (!interaction.channel || !interaction.guild)
            throw new Error(`Invalid interaction found.`);

        await ScoreService.create({
            name,
            description,
            amount,
            serverId: interaction.guild?.id,
            channelId: interaction.channel?.id,
            // @ts-ignore
            userId: user.id
        });

        await interaction.reply({
            embeds: [
                {
                    title: `:boom: A new score, **${name}** has been created. :boom:`,
                    description: `You can now update your score by running \`/score update\`.`,
                    fields: [
                        {
                            name: 'name',
                            value: name
                        },
                        {
                            name: 'description',
                            value: description || 'No description provided.'
                        },
                        {
                            name: 'amount',
                            value: amount.toString()
                        }
                    ]
                }
            ]
        });
    }
};

export default ScoreCreate;