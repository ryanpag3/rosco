import { Command } from '../../types/command';
import prisma from '../util/prisma';

const PollList: Command = {
    id: 'a0cf1752-e5fc-414e-bebd-ee2475beef98',
    name: 'poll list',
    handler: async (interaction, user, server) => {
        const page = interaction.options.getInteger('page') || 1;
        const filter = interaction.options.getString('filter');

        let where = {
            serverId: server?.id
       }

        if (filter) {
            // @ts-ignore
            where['OR'] = [
                {
                    name: {
                        contains: filter || undefined
                    }
                },
                {
                    question: {
                        contains: filter || undefined
                    }
                }
            ]
        }

        const limit = 10; 
        const polls = await prisma.poll.findMany({
            where,
            take: limit,
            skip: limit * (page - 1)
        });

        return interaction.reply({
            embeds: [
                {
                    title: `:abacus: ${polls.length} polls found.`,
                    description: `__**name** - question__\n` + polls.map(p => `**${p.name}** - ${p.question}`).join('\n'),
                    footer: {
                        text: `hint: run \`/poll list page: ${page+1}\` to turn to the next page.`
                    }
                }
            ]
        })
    }
};

export default PollList;