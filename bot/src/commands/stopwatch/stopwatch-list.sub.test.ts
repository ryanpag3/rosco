import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';

it('should list out the scores', async () => {
    let int = createTestInteraction('stopwatch', 'create', {
        name: 'test',
        'start-on-create': true
    });

    await onCommandReceived(int);

    int = createTestInteraction('stopwatch', 'list', {});

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});