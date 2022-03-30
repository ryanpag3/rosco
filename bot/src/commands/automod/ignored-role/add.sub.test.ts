import onInteractionCreate from '../../../event/interaction-create';
import logger from '../../../util/logger';
import prisma from '../../../util/prisma';
import { createTestInteraction } from '../../../util/test-helper';

it('should add a new role to the ignore list', async () => {
    const roleId = 'iwinagainlewstherin';

    const int = createTestInteraction('automod', ['ignored-role', 'add'], {
        role: {
            id: roleId
        }
    });

    const r = await onInteractionCreate(int);

    const [ role ] = await prisma.serverAutoModIgnoredRole.findMany({
        where: {
            serverId: r.server.id
        }
    });

    expect(role.roleId).toBe(roleId);
});