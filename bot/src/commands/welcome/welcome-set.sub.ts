import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import { WelcomeType } from './welcome';

const WelcomeSet: Command = {
    id: '17dc2f4e-909f-42e0-84d7-8d12b8ba1ba7',
    name: 'welcome set',
    handler: async (interaction, user, server) => {
        const type = interaction.options.getString('type', true).toUpperCase();
        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title', true);
        const message = interaction.options.getString('message', true);
        const isPublic = type === 'PUBLIC';

        // @ts-ignore
        if (!WelcomeType[type])
            throw new BotError('Invalid type is provided.');

        if (type === WelcomeType.PUBLIC && !channel)
            throw new BotError(`Channel is a required argument for setting a public welcome message.`);

        try {
            await prisma.serverWelcomeMessage.upsert({
                where: {
                    serverId_isPublic: {
                        serverId: server?.id as string,
                        isPublic
                    }
                },
                create: {
                    serverId: server?.id as string,
                    channelId: channel?.id,
                    isPublic,
                    title,
                    message
                },
                update: {
                    title,
                    message
                }
            });

            let fields = [
                {
                    name: 'public',
                    value: (type === 'PUBLIC').toString()
                },
                {
                    name: 'channel',
                    value: channel?.name
                },
                {
                    name: 'title',
                    value: title
                },
                {
                    name: 'message',
                    value: message
                }
            ];

            if (type !== WelcomeType.PUBLIC)
                fields = fields.splice(1, 1);

            return interaction.reply({
                embeds: [
                    {
                        title: ':pencil: :memo: Welcome message has been set!',
                        // @ts-ignore
                        fields
                    }
                ]
            })
        } catch (e) {
            throw e;
        }
    }
}

export default WelcomeSet;
