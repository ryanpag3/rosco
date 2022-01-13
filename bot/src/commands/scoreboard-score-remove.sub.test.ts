import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should remove a score to a valid scoreboard', async () => {
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

    await onCommandReceived(int);

    let scoreboard = await prisma.scoreboard.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: int.guild?.id as string
            }
        },
        include: {
            Scores: true
        }
    });

    expect(scoreboard?.Scores.length).toBe(1);

    int = createTestInteraction('scoreboard', 'remove-score', {
        name: 'test',
        'score-name': 'test-score'
    }, '1', '1', '1');

    await onCommandReceived(int);

    scoreboard = await prisma.scoreboard.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: int.guild?.id as string
            }
        },
        include: {
            Scores: true
        }
    });

    expect(scoreboard?.Scores.length).toBe(0);
});

it('should throw an error if the score does not exist to remove', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('scoreboard', 'remove-score', {
        name: 'test',
        'score-name': 'test-score'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});