import '../util/command-subcommand-map';
import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should set all permissions', async () => {
    let int = createTestInteraction('permission', 'set-all', {
        role: {
            id: '1',
            name: 'test'
        }
    }, '1');

    await onCommandReceived(int);

    let permissions = await prisma.permission.findMany({
        where: {
            serverId: int.guild?.id
        }
    });

    permissions.forEach((p) => expect(p.roleId).toBe('1'));

    int = createTestInteraction('permission', 'unset-all', {
        role: {
            id: '1',
            name: 'test'
        }
    }, '1');

    await onCommandReceived(int);

    permissions = await prisma.permission.findMany({
        where: {
            serverId: int.guild?.id
        }
    });

    expect(permissions.length).toBe(0);
});