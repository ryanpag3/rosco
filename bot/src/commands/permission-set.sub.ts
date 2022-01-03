import { Command } from '../../types/command';
import prisma from '../util/prisma';

const PermissionSet: Command = {
    id: '4e876254-dda4-4da0-9a61-bf3a9a67c3a1',
    name: 'set',
    handler: async (interaction, user) => {
        const command = cleanCommand(interaction.options.getString('command', true));
        const role = interaction.options.getRole('role', true);

        try {
            // await prisma.permission.upsert({
            //     where: {
                    
            //     }
            // })
        } catch (e) {

        }
    }
};

function cleanCommand(command: string) {
    if (command.startsWith('/'))
        command = command.substring(1);
    
    return command;
}

export default PermissionSet;