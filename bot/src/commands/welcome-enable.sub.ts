import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import { WelcomeType } from './welcome';

const WelcomeEnable: Command = {
    id: '88e66be2-65ec-4887-abaf-42a76b8cf24b',
    name: 'welcome enable',
    handler: async (interaction, user, server) => {
        const type = interaction.options.getString('type', true).toUpperCase();

        // @ts-ignore
        if (!WelcomeType[type])
            throw new BotError('Invalid type provided. Valid options are "public" or "private".');

        try {
            await prisma.server.update({
                where: {
                    id: server?.id as string
                },
                data: {
                    [
                        type === WelcomeType.PUBLIC ? 
                            'publicWelcomeMessageEnabled' : 
                            'privateWelcomeMessageEnabled'
                    ]: true
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
                    title: `:green_circle: ${t} welcome messages are now enabled.`,
                    description: `Use \`/welcome disable\` to disable them again.`
                }
            ]
        });
    }
};

export default WelcomeEnable;