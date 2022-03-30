import onInteractionCreate from '../../../event/interaction-create';
import logger from '../../../util/logger';
import prisma from '../../../util/prisma';
import { createTestInteraction } from '../../../util/test-helper';

it('should add a new role to the ignore list and then delete it', async () => {
    const roleId = 'iwinagainlewstherin';

    let int = createTestInteraction('automod', ['ignored-role', 'add'], {
        role: {
            id: roleId
        }
    });

    let r = await onInteractionCreate(int);

    const [ role ] = await prisma.serverAutoModIgnoredRole.findMany({
        where: {
            serverId: r.server.id
        }
    });

    expect(role.roleId).toBe(roleId);

    int = createTestInteraction('automod', ['ignored-role', 'remove'], {
        role: {
            id: roleId
        }
    });

    r = await onInteractionCreate(int);

    const roles = await prisma.serverAutoModIgnoredRole.findMany({});

    expect(roles.length).toBe(0);
});