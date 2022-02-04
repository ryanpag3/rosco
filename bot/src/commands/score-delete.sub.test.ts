import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import * as ScoreService from '../service/score';


it('should delete a score', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1', '1', '1');

    await onCommandReceived(int);

    int = createTestInteraction('score', 'delete', {
        name: 'test'
    }, '1', '1', '1');

    const r = await onCommandReceived(int);

    await expect(ScoreService.findUnique({
        name_serverId: {
            name: 'test',
            // @ts-ignore
            serverId: r.server?.id
        }
    })).rejects.toThrow();
});

it('should throw an error if a score doesnt exist to delete.', async () => {
    const int = createTestInteraction('score', 'delete', {
        name: 'test'
    }, '1', '1', '1');

    expect(onCommandReceived(int)).rejects.toThrow();
})