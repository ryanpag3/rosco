import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const PollClose: Command = {
    id: '0c3e7a9a-f963-4d71-958f-65163aa3078c',
    name: 'poll close',
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
                    isOpen: false
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:lock: Poll has been closed.`,
                        description: `**${name}** has been closed. No further responses are allowed.\n\n You may re-open this poll anytime with \`/poll open\``,
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
            throw new BotError('Could not find a poll with that name.');
        }


    }
};

export default PollClose;