import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import * as ScoreService from '../../service/score';

const ScoreDown: Command = {
    id: '948891de-4ff5-461f-9382-ce5e141277c0',
    name: 'score down',
    description: 'Decrease score amounts.',
    examples: ``,
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
            throw new BotError(`Cannot find score to decrease.`);

        const updatedScore = await ScoreService.update(score.name, score.serverId, {
            amount: score.amount - amount
        });

        await interaction.reply({
            embeds: [
                {
                    title: `:arrow_down: Score has been decreased.`,
                    description: `**${score.name}** has successfully been decreased by ${amount}.`,
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

export default ScoreDown;