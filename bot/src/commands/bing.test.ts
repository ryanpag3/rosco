import { createTestInteraction, getApiResult } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';

it('should reply with bong when called', async () => {
    const int = createTestInteraction('bing');
    const spy = jest.spyOn(int, 'reply');
    await onCommandReceived(int, true);
    expect(spy).toHaveBeenCalled();
    expect(await getApiResult(spy)).toBe('bong');
});