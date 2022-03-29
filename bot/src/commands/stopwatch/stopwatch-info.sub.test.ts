import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';

it('should list out the scores', async () => {
    let int = createTestInteraction('stopwatch', 'create', {
        name: 'test'
    }, '1', '1', '1');

    
    await onCommandReceived(int);

    int = createTestInteraction('stopwatch', 'info', {
        name: 'test'
    }, '1', '1', '1');

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});


it('should throw an error if the stopwatch does not exist', async () => {
    const int = createTestInteraction('stopwatch', 'info', {
        name: 'test'
    }, '1', '1', '1');
    
    await expect(onCommandReceived(int)).rejects.toThrow();
});