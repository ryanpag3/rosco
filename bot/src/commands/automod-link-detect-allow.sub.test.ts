import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should add a link to the allowed list', async () => {
    let i = createTestInteraction('automod', ['link-detect', 'allow'], {
        pattern: 'https://google.com'
    });

    const r = await onCommandReceived(i);

    const allowedLink = await prisma.allowedLink.findUnique({
        where: {
            serverId_pattern: {
                serverId: r.server.id,
                pattern: 'https://google.com'
            }
        }
    });

    expect(allowedLink).not.toBeNull();
    expect(allowedLink).not.toBeUndefined();
});

it('should throw an error if the pattern already exists in the allow list', async () => {
    let i = createTestInteraction('automod', ['link-detect', 'allow'], {
        pattern: 'https://google.com'
    });

    const r = await onCommandReceived(i);

    i = createTestInteraction('automod', ['link-detect', 'allow'], {
        pattern: 'https://google.com'
    });

    await expect(onCommandReceived(i)).rejects.toThrow();
});