import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import * as ScoreService from '../service/score';


it('should update a valid score', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    });

    await onCommandReceived(int);

    int = createTestInteraction('score', 'update', {
        name: 'test',
        description: 'new'
    });

    await onCommandReceived(int);

    const score = await ScoreService.getUnique({
        name: 'test'
    });

    expect(score?.description).toBe('new');
});

it('should throw an error if a score is updated to be named after an existing score', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    });

    await onCommandReceived(int);

    int = createTestInteraction('score', 'create', {
        name: 'test2',
        description: 'description',
        amount: 1
    });

    await onCommandReceived(int);

    int = createTestInteraction('score', 'update', {
        name: 'test',
        'new-name': 'test2'
    });

    await expect(onCommandReceived(int)).rejects.toThrow();
});