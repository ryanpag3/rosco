import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import PrismaErrorCode from '../../util/prisma-error-code';

const ScoreDelete: Command = {
    id: 'ec73f689-6a62-4c19-8a5f-73131e876526',
    name: 'score delete',
    description: 'Delete a score.',
    examples: ``,
    // options are handled in score.ts since this is a subcommand
    options: {},
    handler: async (interaction, _user, server) => {
        const name = interaction.options.getString('name', true);

        try {
            await prisma.score.delete({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id
                    } 
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Could not find score to delete.');
            throw e;
        }

        await interaction.reply({
            embeds: [
                {
                    title: `:do_not_litter: Score has been deleted.`,
                    fields: [
                        {
                            name: 'name',
                            value: name
                        }
                    ]
                }
            ]
        });
    }
};

export default ScoreDelete;