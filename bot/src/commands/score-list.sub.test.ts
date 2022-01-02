import * as ScoreService from '../service/score';
import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';

it('should list out the scores', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1');

    
    await onCommandReceived(int);

    int = createTestInteraction('score', 'create', {
        name: 'test2',
        description: 'description',
        amount: 1
    }, '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('score', 'list', {}, '1');

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].files.length).toBe(1);
    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});