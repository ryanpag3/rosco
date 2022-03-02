import { Command } from '../../types/command';
import LinkCache from '../service/link-cache';
import prisma from '../util/prisma';

const LinkDetectDeny: Command = {
    id: '6e37aff1-e36e-434f-918a-e7adad0b2b12',
    name: 'link-detect deny',
    handler: async (interaction, user, server) => {
        const pattern = interaction.options.getString('pattern', true);

        try {
            const deleted = await prisma.allowedLink.delete({
                where: {
                    serverId_pattern: {
                        serverId: server.id,
                        pattern
                    }
                }
            });

            await LinkCache.deleteRecord(server.id, deleted.id);
        } catch (e) {
            // noop
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:white_check_mark: A pattern has been removed from the allow list.`,
                    description: 'The following pattern will now be detected as an invalid link.',
                    fields: [
                        {
                            name: 'pattern',
                            value: pattern
                        }
                    ]
                }
            ]
        })
    }
};

export default LinkDetectDeny;