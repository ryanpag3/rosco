import { createTestInteraction } from '../../util/test-helper';
import onCommandReceived from '../../event/interaction-create';
import prisma from '../../util/prisma';

it('should add a score to a valid scoreboard', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('score', 'create', {
        name: 'test-score',
        description: 'description',
        amount: 1
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('scoreboard', 'add-score', {
        name: 'test',
        'score-name': 'test-score'
    }, '1', '1', '1');

    const r = await onCommandReceived(int);

    const scoreboard = await prisma.scoreboard.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: r.server?.id as string
            }
        },
        include: {
            ScoreboardScore: true
        }
    });

    expect(scoreboard?.ScoreboardScore.length).toBe(1);
});

it('should throw an error if the score does not exist to add', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('scoreboard', 'add-score', {
        name: 'test',
        'score-name': 'test-score'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});