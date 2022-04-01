import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';
import { WelcomeType } from './welcome';

const WelcomeEnable: Command = {
    id: '88e66be2-65ec-4887-abaf-42a76b8cf24b',
    name: 'welcome enable',
    handler: async (interaction, user, server) => {
        const type = interaction.options.getString('type', true).toUpperCase();
        const channel = interaction.options.getChannel('channel');

        // @ts-ignore
        if (!WelcomeType[type])
            throw new BotError('Invalid type provided. Valid options are "public" or "private".');

        if (type === WelcomeType.PUBLIC && !channel)
            throw new BotError(`Channel is a required argument for enabling public welcome messages.`);

        try {
            await prisma.serverWelcomeMessage.update({
                where: {
                    serverId_isPublic: {
                        serverId: server?.id as string,
                        isPublic: type === 'PUBLIC'
                    }
                },
                data: {
                    isEnabled: true
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError(`Please set a welcome message with \`/welcome set\` before enabling/disabling welcome messages.`);
            // Can't think of a scenario where want to let them know.
            throw e;
        }

        const t = type === WelcomeType.PUBLIC ? 'Public' : 'Private'; 

        return interaction.reply({
            embeds: [
                {
                    title: `:green_circle: ${t} welcome messages are now enabled.`,
                    description: `${t} welcome messages will be sent to ${channel}.\n\nUse \`/welcome disable\` to disable them again.`
                }
            ]
        });
    }
};

export default WelcomeEnable;