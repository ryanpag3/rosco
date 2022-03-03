import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';

const OPTION_LIMIT = 10;

const PollInfo: Command = {
    id: '8704ea11-bb2d-4352-a741-82fc2a221964',
    name: 'poll info',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);

        try {
            const poll = await prisma.poll.findUnique({
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
                rejectOnNotFound: true
            });

            const components = poll.PollOption.map((option) => {
                return {
                    type: 2,
                    style: 1,
                    label: option.content,
                    custom_id: option.id
                }
            }); 

            const rows = chunk(components, OPTION_LIMIT / 4).map(c => {
                return {
                    type: 1, 
                    components: c
                }
            })

            return interaction.reply({
                embeds: [
                    {
                        title: ':abacus: Poll found!',
                        fields: [
                            {
                                name: 'name',
                                value: poll.name
                            },
                            {
                                name: 'question',
                                value: poll.question
                            },
                            {
                                name: 'status',
                                value: poll.isOpen ? 'open' : 'closed'
                            },
                            {
                                name: 'results',
                                value: poll.PollOption.map(po => {
                                    return `${po.Votes.length} | **${po.content}**`
                                }).join('\n')
                            }
                        ]
                    }
                ],
                components: poll.isOpen ? rows : []
            })

        } catch (e: any) {
            if (e.message.includes('Not Found'))
                throw new BotError('Could not find bot with that name.');

            throw e;
        }
    }
};

function chunk (arr: any[], len: number) {

    var chunks = [],
        i = 0,
        n = arr.length;
  
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
  
    return chunks;
  }

export default PollInfo;