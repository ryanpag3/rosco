import { createTestInteraction } from '../../util/test-helper'
import onCommandReceived from '../../event/interaction-create';

it('should display timer info', async () => {
    let int = createTestInteraction('timer', 'create', {
        name: 'test',
        time: '00:00:00:00'
    });
    
    await onCommandReceived(int);

    int = createTestInteraction('timer', 'info', {
        name: 'test'
    });

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});

it('should throw an error if the timer does not exist', async () => {
    let int = createTestInteraction('timer', 'info', {
        name: 'test'
    });
    
    await expect(onCommandReceived(int)).rejects.toThrow();
});