import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';
import COMMANDS from '../../recursive-commands';

it('should set the permission', async () => {
    const int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    });

    const r = await onCommandReceived(int);

    const permission = await prisma.permission.findUnique({
        where: {
            roleId_commandId_serverId: {
                commandId: COMMANDS['ping'].id,
                serverId: r.server.id as string,
                roleId: '1'
            }
        }
    });

    expect(permission).not.toBeNull();
});

it('should allow multiple permissions on the same command', async () => {
    let int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    }, '1', '1', '1');

    let r = await onCommandReceived(int);

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

    int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '2',
            name: 'test'
        }
    }, '1', '1', '1');

    r = await onCommandReceived(int);

    permission = await prisma.permission.findUnique({
        where: {
            roleId_commandId_serverId: {
                commandId: COMMANDS['ping'].id,
                serverId: r.server?.id as string,
                roleId: '2'
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
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('permission', 'set', {
        command: 'ping',
        role: {
            id: '1',
            name: 'test'
        }
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});