import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';

it('should list out the scores', async () => {
    let int = createTestInteraction('announce', 'create', {
        name: 'test',
        when: 'next week',
        message: 'y',
        channel: {
            id: '1'
        }
    });

    await onCommandReceived(int);

    int = createTestInteraction('announce', 'list', {});

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});