import { ApplicationCommandOptionType } from 'discord-api-types';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import PermissionList from './list.sub';
import PermissionSetAll from './permission-set-all.sub';
import PermissionSet from './permission-set.sub';
import PermissionUnsetAll from './permission-unset-all.sub';
import PermissionUnset from './permission-unset.sub';

const Permission: Command = {
    id: '14dbd126-b0ad-459d-8cdb-bf609a61267f',
    name: 'permission',
    description: 'Handles various actions for managing permissions.',
    options: [
        {
            name: 'set',
            description: 'Set a command to require a specific role.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'command',
                    description: 'The command to set the permission for.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'role',
                    description: 'The role to require for the command.',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: 'unset',
            description: 'Remove a permission from the specified command.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'command',
                    description: 'The command to remove the permission from.',
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: 'role',
                    description: 'The role to unset for the command.',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: 'set-all',
            description: 'Set all permissions to require a role.',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'The role to assign all permissions to.',
                    type: ApplicationCommandOptionType.Role,
                    required: true
                }
            ]
        },
        {
            name: 'unset-all',
            description: 'Unset all permissions to require a role.',
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: 'list',
            description: 'List all the permissions in the server.',
            type: ApplicationCommandOptionType.Subcommand
        },
    ],
    handler: async (interaction, user, server) => {
        const subcommand = interaction.options.getSubcommand();
        switch(subcommand) {
            case 'set':
                return PermissionSet.handler(interaction, user, server);
            case 'unset':
                return PermissionUnset.handler(interaction, user, server);
            case 'set-all':
                return PermissionSetAll.handler(interaction, user, server);
            case 'unset-all':
                return PermissionUnsetAll.handler(interaction, user, server);
            case 'list':
                return PermissionList.handler(interaction, user, server);
            default:
                throw new BotError(`Invalid subcommand issued to /permission`);
        }
    }
};

export default Permission;