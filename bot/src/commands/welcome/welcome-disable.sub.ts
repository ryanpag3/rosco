import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';
import { WelcomeType } from './welcome';

const WelcomeDisable: Command = {
    id: 'a71114af-6efd-4da2-98db-2dded1e42cf0',
    name: 'welcome disable',
    handler: async (interaction, user, server) => {
        const type = interaction.options.getString('type', true).toUpperCase();

        // @ts-ignore
        if (!WelcomeType[type])
            throw new BotError('Invalid type provided. Valid options are "public" or "private".');

        try {
            await prisma.serverWelcomeMessage.update({
                where: {
                    serverId_isPublic: {
                        serverId: server?.id as string,
                        isPublic: type === 'PUBLIC'
                    }
                },
                data: {
                    isEnabled: false
                }
            });
        } catch (e) {
            // Can't think of a scenario where want to let them know.
            throw e;
        }

        const t = type === WelcomeType.PUBLIC ? 'Public' : 'Private'; 

        return interaction.reply({
            embeds: [
                {
                    title: `:green_circle: ${t} welcome messages are now disabled.`,
                    description: `Use \`/welcome enable\` to enable them again.`
                }
            ]
        });
    }
};

export default WelcomeDisable;