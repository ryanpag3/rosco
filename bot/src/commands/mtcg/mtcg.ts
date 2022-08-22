import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import MtcgSearch from './search.sub';

const Mtcg: Command = {
    id: '7a5dbd27-a186-47e6-9e4b-77e3523a752c',
    name: 'mtcg',
    description: 'Search for Magic: The Gathering cards.',
    examples: ``,
    options: [
        {
            name: 'search',
            description: 'Search for a Magic: The Gathering card.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'The name you are searching for. ex. Flumph',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'set',
                    description: 'The name of the set the card belongs to. ex. Forgotten Realms',
                    type: ApplicationCommandOptionType.String
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const command = interaction.options.getSubcommand();
        switch(command) {
            case 'search':
                return MtcgSearch.handler(interaction, user, server);
            default:
                throw new BotError(`Invalid mtcg subcommand issued.`);
        }
    }
};

export default Mtcg;