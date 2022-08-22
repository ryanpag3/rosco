import { CommandInteraction, CacheType } from 'discord.js';
import randomColor from 'randomcolor';
import { Command } from 'src/../../types/command';
import * as ScoreService from '../../service/score';

const ScoreCreate: Command = {
    id: 'd770504e-08e7-487b-af3c-e610fcc289f1',
    name: 'score create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const description = interaction.options.getString('description');
        const amount = interaction.options.getInteger('amount') || 0;
        const scoreNamesSplit = name.split(',').map(n => n.trim());
        let color = interaction.options.getString('color');

        let colors = [];
        for (const name of scoreNamesSplit) {
            if (!color) 
                color = randomColor();
            
            await ScoreService.create({
                name,
                description,
                amount,
                // @ts-ignore
                serverId: server?.id as string,
                channelId: interaction.channel?.id as string,
                color,
                userId: user.id
            });
            colors.push(color);
        }

        const fields =  [
            {
                name: 'name(s)',
                value: scoreNamesSplit.join(', ')
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
                value: colors.join(', ')
            } 
        ]

        return interaction.reply({
            embeds: [
                {
                    title: `:boom: ${scoreNamesSplit.length} score has been created.`,
                    description: 'Here are the details of your new score(s).',
                    fields
                }
            ]
        })
    }
};

export default ScoreCreate;