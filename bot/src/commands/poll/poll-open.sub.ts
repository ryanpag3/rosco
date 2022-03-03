import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const PollOpen: Command = {
    id: 'd85d95c9-8b61-45ae-a337-47e5341aa897',
    name: 'poll open',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);

        let poll;
        try {
            poll = await prisma.poll.update({
                where: {
                    name_serverId: {
                        name,
                        serverId: server?.id as string 
                    }
                },
                include: {
                    PollOption: {
                        include: {
                            Votes: {
                                select: {
                                    id: true
                                }
                            }
                        }
                    }
                },
                data: {
                    isOpen: true
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:lock: Poll has been opened.`,
                        description: `**${name}** has been opened for submissions. \n\n You may close this poll anytime with \`/poll close\``,
                        fields: [
                            {
                                name: 'Results',
                                value: poll.PollOption.map(po => {
                                    return `${po.Votes.length} | **${po.content}**`
                                }).join('\n')
                            }
                        ]
                    }
                ]
            })
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Could not find a poll with that name.');
            throw e;
        }
    }
};

export default PollOpen;