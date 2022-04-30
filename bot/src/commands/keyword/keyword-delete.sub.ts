import { Command } from '../../../types/command';
import KeywordCache from '../../service/keyword-cache';
import prisma from '../../util/prisma';

const KeywordDelete: Command = {
    id: 'f10df570-b711-41bc-a083-0b2465304b1e',
    name: 'keyword delete',
    handler: async (interaction, user, server) => {
       const name = interaction.options.getString('name', true); 

        try {
            if (!server)
                throw new Error(`Server instance not instantiated. Keyword functionality has been disabled.`);

            const k = await prisma.keyword.delete({
                where: {
                    name
                }
            });
    
            await KeywordCache.deleteRecord(server.id, k.id);
        } catch (e) {
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:bookmark: Keyword deleted successfully.`,
                    description: `The keyword **${name}** will no longer trigger any score functionality.`
                }
            ]
        });
    }
};

export default KeywordDelete;