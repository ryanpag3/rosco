import { Command } from '../../types/command';
import prisma from '../util/prisma';
import Commands from '../commands';
import BotError from '../util/bot-error';
import { Prisma } from '@prisma/client';

const PermissionUnset: Command = {
    id: '4e876254-dda4-4da0-9a61-bf3a9a67c3a1',
    name: 'set',
    handler: async (interaction, user) => {
        const command = cleanCommand(interaction.options.getString('command', true));

        try {
            if (!Commands[command])
                throw new BotError(`\`/${command}\` does not exist.`);

            const permission = await prisma.permission.findUnique({
                where: {
                    commandId_serverId: {
                        commandId: Commands[command].id,
                        serverId: interaction.guild?.id as string,
                    } 
                }
            });

            if (!permission)
                throw new BotError(`Could not find permission to unset.`);

            await prisma.permission.delete({
                where: {
                    commandId_serverId: {
                        commandId: Commands[command].id,
                        serverId: interaction.guild?.id as string,
                    }
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:flamingo: Permission has been unset.`,
                        description: `The command \`/${command}\` now does not require a role to run.`
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