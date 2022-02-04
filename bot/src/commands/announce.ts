import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../types/command';
import AnnounceCreate from './announce-create.sub';

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
                },
                {
                    name: 'channel',
                    description: 'The channel to make the announcement in.',
                    type: ApplicationCommandOptionType.Channel,
                    required: true                },
                {
                    name: 'when',
                    description: 'When to run the announcement. e.g "in 5 days"',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'message',
                    description: 'The message to display when the announcement is up.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'create':
                return AnnounceCreate.handler(interaction, user, server);
        }
    }
};

export default Announce;