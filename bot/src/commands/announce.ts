import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';

const Announce: Command = {
    id: '5bc832b5-8adf-466a-a14f-b7fb6ca289df',
    name: 'announce',
    description: 'Run various commands related to announcements.',
    options: [
        {
            name: 'create',
            description: 'Schedule an announcement for the future.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'name',
                    description: 'A unique name identifying the announcement.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {

    }
};

export default Announce;