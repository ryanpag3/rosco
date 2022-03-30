import { createTestInteraction } from '../../util/test-helper';
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';

it('should create a stopwatch and start it', async () => {
    let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': true
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

   expect(stopwatch).not.toBeNull();
   expect(stopwatch?.startedAt).not.toBeUndefined();
});

it('should create a stopwatch and not start it', async () => {
    let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': false
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
    
    expect(stopwatch).not.toBeNull();
    expect(stopwatch?.startedAt).toBeNull();
});


it('should throw an error if the stopwatch already exists.', async () => {
    let int = createTestInteraction('stopwatch', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('stopwatch', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});