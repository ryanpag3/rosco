import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should reset a created timer.', async () => {
   let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': false
    }, '1', '1', '1');

    await onCommandReceived(int);

    
   int = createTestInteraction('stopwatch', 'start', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

   int = createTestInteraction('stopwatch', 'reset', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    const stopwatch = await prisma.stopwatch.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: int.guild?.id as string
            }
        }
    });

    expect(stopwatch?.startedAt).toBeNull();
});

it('should throw an error if the stopwatch does not exist.', async () => {
    let int = createTestInteraction('stopwatch', 'reset', {
        name: 'test'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});
