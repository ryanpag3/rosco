import { Prisma } from '@prisma/client';
import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const OPTION_LIMIT = 10;

const PollCreate: Command = {
    id: 'e5c089ea-6664-461c-8b80-08ad17c8ebaa',
    name: 'poll create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const question = interaction.options.getString('question', true);   
        const pollOptions = buildOptionsArray(interaction);

        if (pollOptions.length <= 1)
            throw new BotError(`You must provide at least two options.`);
        
        try {
            const poll = await prisma.poll.create({
                data: {
                    name,
                    question,
                    userId: user.id,
                    serverId: server?.id as string,
                    messageId: interaction.id,
                    PollOption: {
                        createMany: { 
                            data: pollOptions.map(po => {
                                return {
                                    content: po as string
                                }
                            })
                        }
                    }
                },
                include: {
                    PollOption: true
                }
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
                        title: `:abacus: Poll "${name}" has been created`,
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
                                value: 'open'
                            },
                            {
                                name: 'results',
                                value: poll.PollOption.map(po => {
                                    return `0 | **${po.content}**`
                                }).join('\n')
                            }
                        ],
                        footer: {
                            text: `Use \`/poll info\` to get information.`
                        }
                    }
                ],
                components: rows,
            });
        } catch(e) {
            if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
                throw e;
            } else {
                if (e.code === 'P2002') {
                    throw new BotError(`A poll already exists with that name.`);
                }
                throw e;
            }        }
    }
};

const buildOptionsArray = (interaction: CommandInteraction<CacheType>) => {
    let options = [];
    for (let i = 1; i <= OPTION_LIMIT; i++) {
        const option = interaction.options.getString(`option-${i}`);
        if(!option)
            continue;
        options.push(option);
    }

    return options;
}

function chunk (arr: any[], len: number) {

    var chunks = [],
        i = 0,
        n = arr.length;
  
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
  
    return chunks;
  }

export default PollCreate;