import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should create an announcement', async () => {
    const int = createTestInteraction('announce', 'create', {
        name: 'test',
        when: 'in one hour',
        channel: {
            id: '1'
        },
        message: 'message'
    });

    const r = await onInteractionCreate(int);

    const a = await prisma.announcement.findUnique({
        where: {
            serverId_name: {
                name: 'test',
                serverId: r.server.id
            }
        }
    });

    expect(a).toBeDefined();
});

it('should throw an error if an invalid date is provided', async () => {
    const int = createTestInteraction('announce', 'create', {
        name: 'test',
        when: 'asdasdasd',
        channel: {
            id: '1'
        },
        message: 'message'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});