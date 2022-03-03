import { Command } from '../../../../types/command';
import prisma from '../../../util/prisma';

const BannedWordsList: Command = {
    id: '5f2962bf-8ff1-443e-acbb-97ce37c8c3c1',
    name: 'banned-words list',
    handler: async (interaction, user, server) => {
        const words = await prisma.bannedWord.findMany({
            where: {
                serverId: server.id
            }
        });

        return interaction.reply({
            embeds: [
                {
                    title: `:b:anned words`,
                    description: `The following words are banned from this server. \n\n ${words.map((w) => {
                        return `**${w.word}**`
                    }).join(' | ')}`
                }
            ],
            ephemeral: true
        })
    }
};

export default BannedWordsList;