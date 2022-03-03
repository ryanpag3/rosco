import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';

it('should list out the rules', async () => {
    let int = createTestInteraction('automod', ['rule', 'list'], {
        module: 'banned-words'
    });

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});

it('should throw an error with an invalid module', async () => {
    let int = createTestInteraction('automod', ['rule', 'list'], {
        module: 'banned-wordzzzz'
    });

    await expect(onCommandReceived(int)).rejects.toThrow();
});