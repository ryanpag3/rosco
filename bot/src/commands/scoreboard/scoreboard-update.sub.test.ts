import { createTestInteraction } from '../../util/test-helper';
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';

it('should update a scoreboard', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('scoreboard', 'update', {
        name: 'test',
        'new-name': 'test2',
        description: 'aaa'
    }, '1', '1', '1');

    const r = await onCommandReceived(int);

    const scoreboard = await prisma.scoreboard.findUnique({
        where: {
            name_serverId: {
                name: 'test2',
                serverId: r.server.id
            }
        }
    });

    expect(scoreboard).not.toBeNull();
});

it('should throw an error if the scoreboard does not exist to update', async () => {
    const int = createTestInteraction('scoreboard', 'update', {
        name: 'test',
        'new-name': 'test2',
        description: 'aaa'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
})