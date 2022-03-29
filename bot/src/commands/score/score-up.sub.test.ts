import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';
import * as ScoreService from '../../service/score';

it('should increase the score count', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description'
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('score', 'up', {
        name: 'test'
    }, '1', '1', '1');

    const r = await onCommandReceived(int);

    const score = await ScoreService.findUnique({
        name_serverId: {
            name: 'test',
            serverId: r.server?.id as string
        }
    });

    expect(score?.amount).toBe(1);
});

it('should increase the score count by the designated amount', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description'
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('score', 'up', {
        name: 'test',
        amount: 100
    }, '1', '1', '1');

    const r = await onCommandReceived(int);

    const score = await ScoreService.findUnique({
        name_serverId: {
            name: 'test',
            serverId: r.server?.id as string
        }
    });

    expect(score?.amount).toBe(100);
});

it('should throw an error if a score does not exist', async () => {
    const int = createTestInteraction('score', 'up', {
        name: 'test',
        amount: 100
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});