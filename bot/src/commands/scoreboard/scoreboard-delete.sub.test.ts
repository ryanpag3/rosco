import { createTestInteraction } from '../../util/test-helper';
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';

it('should delete a scoreboard', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('scoreboard', 'delete', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    const scoreboard = await prisma.scoreboard.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: '1'
            }
        },
        rejectOnNotFound: false
    });

    expect(scoreboard).toBeNull();
});

it('should throw an error if a scoreboard does not exist to delete', async () => {
    const int = createTestInteraction('scoreboard', 'delete', {
        name: 'test'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});