import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';
import COMMANDS from '../commands';

it('should unset the permission', async () => {
    let int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    }, '1', '1', '1');

    const r = await onCommandReceived(int);

    let permission = await prisma.permission.findUnique({
        where: {
            roleId_commandId_serverId: {
                commandId: COMMANDS['ping'].id,
                serverId: r.server?.id as string,
                roleId: '1'
            }
        }
    });

    expect(permission).not.toBeNull();

    int = createTestInteraction('permission', 'unset', {
        command: 'ping',
        role: {
            id: '1'
        }
    }, '1', '1', '1');

    await onCommandReceived(int);

    permission = await prisma.permission.findUnique({
        where: {
            roleId_commandId_serverId: {
                commandId: COMMANDS['ping'].id,
                serverId: r.server?.id as string,
                roleId: '1'
            }
        },
        rejectOnNotFound: false
    }) as any;

    expect(permission).toBeNull();
});

it('should throw an error if a command does not exist', async () => {
    const int = createTestInteraction('permission', 'unset', {
        command: 'iwinagainlewtherin'
    });

    await expect(onCommandReceived(int)).rejects.toThrow();
});

it('should throw an error if the permission doesnt exists', async () => {
    const int = createTestInteraction('permission', 'unset', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});