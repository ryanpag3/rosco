import { Command } from '../../../types/command';
import * as ScoreService from '../../service/score';
import BotError from '../../util/bot-error';

const ScoreMultiply: Command = {
    id: '90ab4a48-08ed-4f00-9e3f-520652df6844',
    name: 'score multiply',
    description: 'Multiple the score by an amount.',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const multiplier = interaction.options.getInteger('multiplier', true);
        let score;
        try {
            score = await ScoreService.findUnique({
                name_serverId: {
                    name,
                    serverId: server?.id as string
                }
            });
        } catch (e) {
            throw new BotError('Could not find score to multiply.');
        }

        const updatedScore = await ScoreService.update(score.name, score.serverId, {
            amount: score.amount * multiplier
        });

        await interaction.reply({
            embeds: [
                {
                    title: `:arrow_forward: Score has been multiplied.`,
                    description: `**${score.name}** has successfully been multiplied by ${multiplier}.`,
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

export default ScoreMultiply;