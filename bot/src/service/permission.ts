import { Server, User } from '@prisma/client';
import { CommandInteraction } from 'discord.js';
import COMMANDS from '../recursive-commands';
import logger from '../util/logger';
import prisma from '../util/prisma';

export const userHasPermission = async (interaction: CommandInteraction, server: Server, user: User) => {
    try {
        // @ts-ignore
        if (interaction.member.permissions.has('ADMINISTRATOR') && process.env.DISABLE_ADMIN_BYPASS === true) {
            return true;
        }

        const { commandName } = interaction;
        const subcommandGroup = interaction.options.getSubcommandGroup(false);
        const subcommand = interaction.options.getSubcommand(false);
        const fullCommand = `${subcommandGroup || commandName}${subcommand ? ` ${subcommand}` : ''}`;
        const module = COMMANDS[fullCommand];

        if (!module)
            throw new Error(`Corrupted command schema detected. Verify your command names! Command ${fullCommand}`);

        const permissions = await prisma.permission.findMany({
            where: {
                commandId: module.id,
                serverId: server.id as string
            }
        });

        if (permissions.length === 0) {
            return true;
        }

        for (const permission of permissions) {
            // @ts-ignore
            if (await interaction.member.roles.cache.has(permission.roleId)) {
                logger.trace(`permission found`);
                return true;
            }
        }

        return false;
    } catch (e) {
        throw e;
    }
}