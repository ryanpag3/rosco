import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';
import COMMANDS from '../commands';

it('should set the permission', async () => {
    const int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    });

    await onCommandReceived(int);

    const permission = await prisma.permission.findUnique({
        where: {
            commandId_serverId: {
                commandId: COMMANDS['ping'].id,
                serverId: int.guild?.id as string
            }
        }
    });

    expect(permission).not.toBeNull();
});

it('should throw an error if a command does not exist', async () => {
    const int = createTestInteraction('permission', 'set', {
        command: 'iwinagainlewtherin',
        role: {
            id: '1',
            name: 'test'
        }
    });

    await expect(onCommandReceived(int)).rejects.toThrow();
});

it('should throw an error if the permission already exists', async () => {
    let int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    }, '1');

    await onCommandReceived(int);

    int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    }, '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});