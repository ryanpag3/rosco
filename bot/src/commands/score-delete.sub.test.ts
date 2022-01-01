import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import * as ScoreService from '../service/score';


it('should delete a score', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    });

    await onCommandReceived(int);

    int = createTestInteraction('score', 'delete', {
        name: 'test'
    });

    const found = await ScoreService.getUnique({
        name_serverId: {
            name: 'test',
            // @ts-ignore
            serverId: int.guild?.id
        }
    });

    expect(found).toBeNull();
})