import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';

it('should list out the scores', async () => {
    let int = createTestInteraction('permission', 'set-all', {
        role: {
            id: '1',
            name: 'test'
        }
    });

    await onCommandReceived(int);

    int = createTestInteraction('permission', 'list', {}, '1', '1', '1');

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});