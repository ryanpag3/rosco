import { Command } from '../../types/command';
import prisma from '../util/prisma';
import BotError from '../util/bot-error';
import { Prisma } from '@prisma/client';
import COMMANDS from '../recursive-commands';

const PermissionUnset: Command = {
    id: '4e876254-dda4-4da0-9a61-bf3a9a67c3a1',
    name: 'permission unset',
    handler: async (interaction, user, server) => {
        let command = interaction.options.getString('command', true);
        const role = interaction.options.getRole('role', true);

        try {
            if (!COMMANDS[command])
                throw new BotError(`\`/${command}\` does not exist.`);

            command = cleanCommand(command);

            const permission = await prisma.permission.findUnique({
                where: {
                    roleId_commandId_serverId: {
                        commandId: COMMANDS[command].id,
                        serverId: server?.id as string,
                        roleId: role.id
                    } 
                }
            });

            if (!permission)
                throw new BotError(`Could not find permission to unset.`);

            await prisma.permission.delete({
                where: {
                    roleId_commandId_serverId: {
                        commandId: COMMANDS[command].id,
                        serverId: server?.id as string,
                        roleId: role.id
                    }
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:flamingo: Permission has been unset.`,
                        description: `The command \`/${command}\` now does not require the role **${role.name}** to run.`
                    }
                ]
            });
        } catch (e) {
            if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
                throw e;
            } else {
                if (e.code === 'P2002') {
                    throw new BotError(`This permission already exists.`);
                }
                throw e;
            }
        }
    }
};

function cleanCommand(command: string) {
    if (command.startsWith('/'))
        command = command.substring(1);
    
    return command;
}

export default PermissionUnset;