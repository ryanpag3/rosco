import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should create a timer', async () => {
    const int = createTestInteraction('timer', 'create', {
        name: 'test',
        time: '00:10:00:00',
        message: 'message'
    });

    const r = await onInteractionCreate(int);

    const timer = await prisma.timer.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: r?.server?.id as string
            }
        }
    });

    expect(timer).not.toBeNull();
    expect(timer).not.toBeUndefined();
});

it('should throw an error if a timer already exists with a name', async () => {
    let int = createTestInteraction('timer', 'create', {
        name: 'test',
        time: '00:10:00:00',
        message: 'message'
    });

    await onInteractionCreate(int);

    int = createTestInteraction('timer', 'create', {
        name: 'test',
        time: '00:10:00:00',
        message: 'message'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});