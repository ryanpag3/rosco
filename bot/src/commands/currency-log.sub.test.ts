import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';

it('should list out the recent currency events', async () => {
    let int = createTestInteraction('currency', 'log');

    const spy = jest.spyOn(int, 'reply');

    await onCommandReceived(int);

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});