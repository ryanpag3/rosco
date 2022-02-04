import onCommandReceived from '../event/interaction-create';
import { createTestInteraction } from '../util/test-helper';
import prisma from '../util/prisma';

it('should delete a timer', async () => {
    let int = createTestInteraction('timer', 'create', {
        name: 'test',
        time: `00:00:00:00`
    });

    await onCommandReceived(int);

    int = createTestInteraction('timer', 'delete', {
        name: 'test'
    });

    const r = await onCommandReceived(int);

    const timer = await prisma.timer.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: r?.server?.id as string
            }
        },
        rejectOnNotFound: false
    });

    expect(timer).toBeNull();
});

it('should throw an error if a timer does not exist to delete', async () => {
    const int = createTestInteraction('timer', 'delete', {
        name: 'test'
    });

    await expect(onCommandReceived(int)).rejects.toThrow();
});