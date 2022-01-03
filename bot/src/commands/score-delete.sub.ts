import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import * as ScoreService from '../service/score';

const ScoreDelete: Command = {
    id: 'ec73f689-6a62-4c19-8a5f-73131e876526',
    name: 'delete',
    description: 'Delete a score.',
    examples: ``,
    // options are handled in score.ts since this is a subcommand
    options: {},
    handler: async (interaction, _user) => {
        const name = interaction.options.getString('name');

        const score = await prisma.score.findUnique({
            where: {
                name_serverId: {
                    // @ts-ignore
                    name,
                    // @ts-ignore
                    serverId: interaction.guild?.id
                }
            }
        });

        if (!score)
            throw new BotError(`Cannot find score with name **${name}**.`);

        await ScoreService.del({
            id: score.id
        });

        await interaction.reply({
            embeds: [
                {
                    title: `:do_not_litter: Score has been deleted.`,
                    fields: [
                        {
                            name: 'name',
                            value: score.name
                        }
                    ]
                }
            ]
        });
    }
};

export default ScoreDelete;