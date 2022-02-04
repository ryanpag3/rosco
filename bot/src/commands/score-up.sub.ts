import { Command } from '../../types/command';
import * as ScoreService from '../service/score';
import BotError from '../util/bot-error';

const ScoreUp: Command = {
    id: '2f216d6c-e47d-43d5-8a25-c4ab8d95bfa0',
    name: 'score up',
    description: 'Increase score amounts.',
    examples: ``,
    // options are handled in score.ts since this is a subcommand
    options: {},
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name');
        const amount = interaction.options.getInteger('amount') || 1;

        const score = await ScoreService.findUnique({
            name_serverId: {
                name: name as string,
                serverId: server?.id as string
            }
        });

        if (!score)
            throw new BotError(`Cannot find score to increase.`);

        const updatedScore = await ScoreService.update(score.name, score.serverId, {
            amount: score.amount + amount
        });

        await interaction.reply({
            embeds: [
                {
                    title: `:arrow_up: Score has been increased.`,
                    description: `**${score.name}** has successfully been increased by ${amount}.`,
                    fields: [
                        {
                            name: 'name',
                            value: score.name
                        },
                        {
                            name: 'changes',
                            value: `${score.amount.toString()} -> ${updatedScore.amount.toString()}`
                        }
                    ]

                }
            ]
        })
    }
};

export default ScoreUp;