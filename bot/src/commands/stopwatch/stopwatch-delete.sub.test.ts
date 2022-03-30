import onCommandReceived from '../../event/interaction-create';
import { createTestInteraction } from '../../util/test-helper';
import prisma from '../../util/prisma';

it('should delete a stopwatch', async () => {
    let int = createTestInteraction('stopwatch', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('stopwatch', 'delete', {
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
        },
        rejectOnNotFound: false
    });

    expect(stopwatch).toBeNull();
});

it('should throw an error if a stopwatch does not exist to delete', async () => {
    const int = createTestInteraction('stopwatch', 'delete', {
        name: 'test'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});