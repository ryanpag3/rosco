import { Command } from '../../types/command';
import prisma from '../util/prisma';
import BotError from '../util/bot-error';
import { Prisma } from '@prisma/client';
import COMMANDS from '../recursive-commands';

const PermissionSet: Command = {
    id: '5587e040-7897-4874-ab8e-2eff98b9618b',
    name: 'permission set',
    handler: async (interaction, user, server) => {
        const command = cleanCommand(interaction.options.getString('command', true));
        const role = interaction.options.getRole('role', true);

        try {
            if (!COMMANDS[command])
                throw new BotError(`\`/${command}\` does not exist.`);

            await prisma.permission.create({
                data: {
                    commandId: COMMANDS[command].id,
                    roleId: role.id,
                    serverId: server?.id as string,
                    userId: user.id
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:police_car: Permission has been set.`,
                        description: `The command \`/${command}\` now requires role **${role.name}** in this server.`
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

export default PermissionSet;