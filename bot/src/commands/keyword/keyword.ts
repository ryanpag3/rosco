import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import KeywordCreate from './keyword-create.sub';
import KeywordDelete from './keyword-delete.sub';
import KeywordList from './keyword-list.sub';

const Keyword: Command = {
    id: '29f9209f-794e-4352-908f-074078f34990',
    name: 'keyword',
    description: 'Runs various commands related to keywords.',
    examples: ``,
    options: [
        {
            name: 'create',
            description: 'Create a keyword and assign it to a score. When users type the keyword the score will change.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'keyword',
                    description: 'The keyword or phrase to check.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'score-name',
                    description: 'The name of the score to assign the keyword to.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'action',
                    description: 'Which action to take on the score when keyword is found. Valid options are "UP" or "DOWN".',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'amount',
                    description: 'Optionally set the amount to increase or decrease the score when keyword is found.',
                    type: ApplicationCommandOptionType.Integer
                },
                {
                    name: 'channel',
                    description: 'Optionally limit the keyword detection to a specific channel.',
                    type: ApplicationCommandOptionType.Channel
                },
                {
                    name: 'user',
                    description: 'Optionally limit the keyword detection to a specific user.',
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: 'role',
                    description: 'Optionally limit the keyword detection to a specific role.',
                    type: ApplicationCommandOptionType.Role
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a keyword for a score.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'keyword',
                    description: 'The keyword or phrase to check.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'score-name',
                    description: 'The name of the score to assign the keyword to.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'action',
                    description: 'Which action was defined for the keyword you are deleting.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'channel',
                    description: 'Which channel the keyword is assigned to. (Optional)',
                    type: ApplicationCommandOptionType.Channel
                },
                {
                    name: 'user',
                    description: 'Which user the keyword is assigned to. (Optional)',
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: 'role',
                    description: 'Which role the keyword is assigned to. (Optional)',
                    type: ApplicationCommandOptionType.Role
                }
            ]
        },
        {
            name: 'list',
            description: 'List out active keywords.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'keyword',
                    description: 'Filter the list by a keyword or phrase.',
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: 'score-name',
                    description: 'Filter the list by keywords assigned to a score.',
                    type: ApplicationCommandOptionType.String
                }
            ]
        }
    ],
    handler: async (interaction, user, server) => {
        const commandName = interaction.options.getSubcommand();
        
        switch(commandName) {
            case 'create':
                return KeywordCreate.handler(interaction, user, server);
            case 'delete':
                return KeywordDelete.handler(interaction, user, server);
            case 'list':
                return KeywordList.handler(interaction, user, server);
            default:
                throw new BotError(`Invalid keyword subcommand provided.`);
        }
    }
};

export default Keyword;