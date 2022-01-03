import { User } from '@prisma/client';
import { CommandInteraction } from 'discord.js';
import commands from '../util/command-subcommand-map';
import logger from '../util/logger';
import prisma from '../util/prisma';

export const userHasPermission = async (interaction: CommandInteraction, user: User) => {
    try {
        // @ts-ignore
        if (interaction.member.permissions.has('ADMINISTRATOR') && !process.env.ADMIN_BYPASS) {
            return true;
        }

        const { commandName } = interaction;
        const subcommand = interaction.options.getSubcommand(false);
        const fullCommand = `${commandName}${subcommand ? ` ${subcommand}` : ''}`;
        logger.debug(fullCommand);
        const module = commands[fullCommand];

        const permission = await prisma.permission.findUnique({
            where: {
                commandId_serverId: {
                    commandId: module.id,
                    serverId: interaction.guild?.id as string
                }
            }
        });

        // @ts-ignore
        return interaction.member.roles.cache.has(permission.roleId);
    } catch (e) {
        throw e;
    }
}