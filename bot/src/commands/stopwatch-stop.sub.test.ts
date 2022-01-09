import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should stop a created timer.', async () => {
   let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': true
    }, '1');

    await onCommandReceived(int);

    
   int = createTestInteraction('stopwatch', 'stop', {
        name: 'test'
    }, '1');

    await onCommandReceived(int);

    const stopwatch = await prisma.stopwatch.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: int.guild?.id as string
            }
        }
    });

    expect(stopwatch?.stoppedAt).not.toBeNull();
    
});

it('should throw an error if the stopwatch does not exist.', async () => {
    let int = createTestInteraction('stopwatch', 'stop', {
        name: 'test'
    }, '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});


it('it should throw an error if a created stopwatch has not been started before stopping.', async () => {
   let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': false
    }, '1');

    await onCommandReceived(int);
    
    int = createTestInteraction('stopwatch', 'stop', {
        name: 'test'
    }, '1');

    await expect(onCommandReceived(int)).rejects.toThrow();

});