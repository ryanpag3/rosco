import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should pause a timer', async () => {
    let int = createTestInteraction('timer', 'create', {
        name: 'test',
        time: '00:10:00:00',
        message: 'message'
    });

    await onInteractionCreate(int);

    int = createTestInteraction('timer', 'pause', {
        name: 'test'
    });

    await onInteractionCreate(int); 

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id
        }
    });

    const timer = await prisma.timer.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: server?.id as string
            }
        }
    });

    expect(timer).not.toBeNull();
    expect(timer).not.toBeUndefined();
    expect(timer.expiresOn).toBeNull();
    expect(timer.pausedDuration).not.toBeNull();
});

it('should unpause a previously paused timer', async () => {
    let int = createTestInteraction('timer', 'create', {
        name: 'test',
        time: '00:10:00:00',
        message: 'message'
    });

    await onInteractionCreate(int);

    int = createTestInteraction('timer', 'pause', {
        name: 'test'
    });

    await onInteractionCreate(int);

    int = createTestInteraction('timer', 'pause', {
        name: 'test'
    });

    await onInteractionCreate(int);

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id
        }
    });

    const timer = await prisma.timer.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: server?.id as string
            }
        }
    });

    expect(timer).not.toBeNull();
    expect(timer).not.toBeUndefined();
    expect(timer.expiresOn).not.toBeNull();
    expect(timer.pausedDuration).toBeNull();
})

it('should throw an error if the timer does not exist to pause', async () => {
    let int = createTestInteraction('timer', 'pause', {
        name: 'test'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow(); 
});

