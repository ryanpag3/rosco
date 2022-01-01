import { Prisma, User } from '@prisma/client';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import ScoreType from '../util/score-type';
import * as ScoreService from '../service/score';

const ScoreCreate: Command = {
    name: 'create',
    description: 'Create a score.',
    examples: ``,
    // options for this subcommand are located in score.ts
    options: {},
    handler: async (interaction, user: User) => {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const type = interaction.options.getString('type') || ScoreType.SERVER;
        const amount = interaction.options.getInteger('amount') || 0;

        if (!name)
            throw new BotError(`Name is a required field.`);

        if (!Object.values(ScoreType).includes(type as any))
            throw new BotError(`Invalid score type provided.`)

        if (!interaction.channel || !interaction.guild)
            throw new Error(`Invalid interaction found.`);

        await ScoreService.create({
            name,
            description,
            // @ts-ignore
            type,
            amount,
            serverId: interaction.guild?.id,
            channelId: interaction.channel?.id,
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
                            name: 'type',
                            value: type
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