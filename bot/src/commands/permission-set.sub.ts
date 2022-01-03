import { Command } from '../../types/command';
import prisma from '../util/prisma';
import Commands from '../commands';
import BotError from '../util/bot-error';
import { Prisma } from '@prisma/client';

const PermissionSet: Command = {
    id: '4e876254-dda4-4da0-9a61-bf3a9a67c3a1',
    name: 'set',
    handler: async (interaction, user) => {
        const command = cleanCommand(interaction.options.getString('command', true));
        const role = interaction.options.getRole('role', true);

        try {
            if (!Commands[command])
                throw new BotError(`\`/${command}\` does not exist.`);

            await prisma.permission.create({
                data: {
                    commandId: Commands[command].id,
                    roleId: role.id,
                    serverId: interaction.guild?.id as string,
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