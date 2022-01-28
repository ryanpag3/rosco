import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import { WelcomeType } from './welcome';

const WelcomeSet: Command = {
    id: '17dc2f4e-909f-42e0-84d7-8d12b8ba1ba7',
    name: 'welcome set',
    handler: async (interaction, user, server) => {
        const type = interaction.options.getString('type', true).toUpperCase();
        const message = interaction.options.getString('message', true);

        // @ts-ignore
        if (!WelcomeType[type])
            throw new BotError('Invalid type is provided.');

        await prisma.server.update({
            where: {
                id: server?.id as string
            }, 
            data: {
                [
                    type === WelcomeType.PUBLIC ? 
                        'publicWelcomeMessage' : 
                        'privateWelcomeMessage'
                ]: message
            }
        });

        const t = type === WelcomeType.PUBLIC ? 'Public' : 'Private'; 

        return interaction.reply({
            embeds: [{
                title: `:pencil2: ${t} welcome message has been set.`,
                description: `Message was set to: \n\n ${message}`
            }]
        });
    }
}

export default WelcomeSet;
