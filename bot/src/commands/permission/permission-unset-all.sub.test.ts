import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';

it('should set all permissions', async () => {
    let int = createTestInteraction('permission', 'set-all', {
        role: {
            id: '1',
            name: 'test'
        }
    }, '1', '1', '1');

    const r = await onCommandReceived(int);

    let permissions = await prisma.permission.findMany({
        where: {
            serverId: r.server?.id
        }
    });

    permissions.forEach((p) => expect(p.roleId).toBe('1'));

    int = createTestInteraction('permission', 'unset-all', {
        role: {
            id: '1',
            name: 'test'
        }
    }, '1', '1', '1');

    await onCommandReceived(int);

    permissions = await prisma.permission.findMany({
        where: {
            serverId: r.server?.id
        }
    });

    expect(permissions.length).toBe(0);
});