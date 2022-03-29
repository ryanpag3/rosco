import { createTestInteraction } from '../../util/test-helper';
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';

it('should start a created timer.', async () => {
   let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': false
    }, '1', '1', '1');

    await onCommandReceived(int);

    
   int = createTestInteraction('stopwatch', 'start', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id as string
        },
        include: {
            ServerWelcomeMessage: true
        }
    });

    const stopwatch = await prisma.stopwatch.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: server?.id as string
            }
        }
    });

    expect(stopwatch?.startedAt).not.toBeNull();
    
});

it('should throw an error if the stopwatch does not exist.', async () => {
    let int = createTestInteraction('stopwatch', 'start', {
        name: 'test'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});


it('should throw an error if the stopwatch has already been started.', async () => {
   let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': false
    }, '1', '1', '1');

    await onCommandReceived(int);

    
   int = createTestInteraction('stopwatch', 'start', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id as string
        },
        include: {
            ServerWelcomeMessage: true
        }
    });

    const stopwatch = await prisma.stopwatch.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: server?.id as string
            }
        }
    });

    expect(stopwatch?.startedAt).not.toBeNull();

    int = createTestInteraction('stopwatch', 'start', {
        name: 'test'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});