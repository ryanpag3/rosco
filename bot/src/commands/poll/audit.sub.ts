import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';

const PollAudit: Command = {
    id: 'c0ee8743-1ed2-4d4e-8a2e-d11b83a17156',
    name: 'poll audit',
    handler: async (interaction, user, server) => {
        const pollName = interaction.options.getString('poll', true);
        const channel = interaction.options.getChannel('channel', true);
        const enabled = interaction.options.getBoolean('enabled') == null ? true : interaction.options.getBoolean('enabled');

        const poll = await prisma.poll.findUnique({
            where: {
                name_serverId: {
                    name: pollName,
                    serverId: server.id
                }
            },
            rejectOnNotFound: false
        });

        if (!poll) {
            throw new BotError(`A poll by the name ${pollName} was not found on this server. Please check your spelling.`);
        }

        const channelId = (enabled === true) ? channel.id : null;

        await prisma.poll.update({
            where: {
                id: poll.id
            },
            data: {
                auditChannelId: channelId
            }
        });

        return interaction.reply({
            embeds: [
                {
                    description: `Vote auditing has been ${enabled ? 'enabled' : 'disabled'} for poll **${pollName}** for channel ${channel}`
                }
            ]
        })

    }
}

export default PollAudit;