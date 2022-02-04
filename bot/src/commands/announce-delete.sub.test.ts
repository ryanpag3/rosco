import { createTestInteraction } from '../util/test-helper';
import prisma from '../util/prisma';
import onInteractionCreate from '../event/interaction-create';

it('should delete a announcement', async () => {
    let int = createTestInteraction('announce', 'create', {
        name: 'test',
        when: 'in one hour',
        channel: {
            id: '1'
        },
        message: 'message'
    });

    let r = await onInteractionCreate(int);

    int = createTestInteraction('announce', 'delete', {
        name: 'test'
    });

    r = await onInteractionCreate(int);

    const a = await prisma.announcement.findUnique({
        where: {
            serverId_name: {
                name: 'test',
                serverId: r?.server?.id as string
            }
        },
        rejectOnNotFound: false
    });

    expect(a).toBeNull();
});

it('should throw an error if a timer does not exist to delete', async () => {
    const int = createTestInteraction('announce', 'delete', {
        name: 'test'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});
