import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import * as ScoreService from '../../service/score';
import randomColor from 'randomcolor';

const ScoreCreate: Command = {
    id: 'd770504e-08e7-487b-af3c-e610fcc289f1',
    name: 'score create',
    description: 'Create a score.',
    examples: ``,
    // options for this subcommand are located in score.ts
    options: {},
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const amount = interaction.options.getInteger('amount') || 0;
        const color = interaction.options.getString('color') || randomColor();

        if (!name)
            throw new BotError(`Name is a required field.`);

        if (name.includes(','))
            throw new BotError(`Name contains invalid characters. [,]`)

        if (!interaction.channel || !interaction.guild)
            throw new Error(`Invalid interaction found.`);

        await ScoreService.create({
            name,
            description,
            amount,
            // @ts-ignore
            serverId: server?.id,
            channelId: interaction.channel?.id,
            color,
            // @ts-ignore
            userId: user.id
        });

        await interaction.reply({
            embeds: [
                {
                    title: `:boom: A new score has been created.`,
                    description: `Here are the details`,
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
                        },
                        {
                            name: 'color',
                            value: color
                        }
                    ]
                }
            ]
        });
    }
};

export default ScoreCreate;