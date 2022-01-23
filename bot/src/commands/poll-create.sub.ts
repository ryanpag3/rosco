import { CacheType, CommandInteraction } from 'discord.js';
import { Command } from '../../types/command';
import prisma from '../util/prisma';

const OPTION_LIMIT = 10;

const PollCreate: Command = {
    id: 'e5c089ea-6664-461c-8b80-08ad17c8ebaa',
    name: 'poll create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const question = interaction.options.getString('question', true);   
        const pollOptions = buildOptionsArray(interaction);
        
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
                        title: `:abacus: Poll has been created`,
                        description: poll.PollOption.map(po => `_0_ | **${po.content}**`).join('\n')
                    }
                ],
                components: rows,
            });
        } catch(e) {
            throw e;       
        }
    }
};

const buildOptionsArray = (interaction: CommandInteraction<CacheType>) => {
    
    let options = [];
    for (let i = 1; i <= OPTION_LIMIT; i++) {
        options.push(interaction.options.getString(`option-${i}`));
    }

    return options.filter(o => o !== null);
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