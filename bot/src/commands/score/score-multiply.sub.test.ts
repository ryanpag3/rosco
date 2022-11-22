import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';
import * as ScoreService from '../../service/score';

it('should multiple the score count', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 4
    });
    
    await onCommandReceived(int);

    int = createTestInteraction('score', 'multiply', {
        name: 'test',
        multiplier: 4
    });

    const r = await onCommandReceived(int);

    const score = await ScoreService.findUnique({
        name_serverId: {
            name: 'test',
            serverId: r.server?.id as string
        }
    });

    expect(score?.amount).toBe(16);
});

it('should throw an error if a score does not exist', async () => {
    const int = createTestInteraction('score', 'multiply', {
        name: 'test',
        multiplier: 2
    });

    await expect(onCommandReceived(int)).rejects.toThrow();
});