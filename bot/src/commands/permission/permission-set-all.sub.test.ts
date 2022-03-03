import '../util/command-subcommand-map';
import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';

it('should set all permissions', async () => {
    const int = createTestInteraction('permission', 'set-all', {
        role: {
            id: '1',
            name: 'test'
        }
    });

    const r = await onCommandReceived(int);

    const permissions = await prisma.permission.findMany({
        where: {
            serverId: r.server?.id
        }
    });

    permissions.forEach((p) => expect(p.roleId).toBe('1'));
});