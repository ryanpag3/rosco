import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should update a scoreboard', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    }, '1');

    await onCommandReceived(int);

    int = createTestInteraction('scoreboard', 'update', {
        name: 'test',
        'new-name': 'test2',
        description: 'aaa'
    }, '1');

    await onCommandReceived(int);

    const scoreboard = await prisma.scoreboard.findUnique({
        where: {
            name_serverId: {
                name: 'test2',
                serverId: '1'
            }
        }
    });

    expect(scoreboard).not.toBeNull();
});