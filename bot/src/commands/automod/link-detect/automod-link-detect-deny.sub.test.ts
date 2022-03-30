import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';
import prisma from '../../../util/prisma';

it('should remove a link from the allow list', async () => {
    let i = createTestInteraction('automod', ['link-detect', 'allow'], {
        pattern: 'https://google.com'
    });

    let r = await onCommandReceived(i);

    let allowedLink = await prisma.allowedLink.findUnique({
        where: {
            serverId_pattern: {
                serverId: r.server.id,
                pattern: 'https://google.com'
            }
        }
    });

    expect(allowedLink).not.toBeNull();
    expect(allowedLink).not.toBeUndefined();

    i = createTestInteraction('automod', ['link-detect', 'deny'], {
        pattern: 'https://google.com'
    });

    r = await onCommandReceived(i);

    await expect(prisma.allowedLink.findUnique({
        where: {
            serverId_pattern: {
                serverId: r.server.id,
                pattern: 'https://google.com'
            }
        }
    })).rejects.toThrow();
});
