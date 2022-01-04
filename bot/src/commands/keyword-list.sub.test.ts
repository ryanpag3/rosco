import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';

it('should list out the scores', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'create', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin'
    }, '1');

    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'list', {}, '1');

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});

it('should list out the scores that match keyword', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'create', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin'
    }, '1');

    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'create', {
        'score-name': 'test',
        keyword: 'test'
    }, '1');

    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'list', {
        keyword: 'test'
    }, '1');

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds[0].description.includes('test')).toBeTruthy();
    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds[0].description.includes('iwinagainlewstherin')).not.toBeTruthy();
});

it('should list out the scores that match score name', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('score', 'create', {
        name: 'aaa',
        description: 'description',
        amount: 1
    }, '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'create', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin'
    }, '1');

    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'list', {
        'score-name': 'test'
    }, '1');

    const spy = jest.spyOn(int, 'reply');
    
    await onCommandReceived(int);

    expect(spy).toHaveBeenCalled();

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds[0].description.includes('test')).toBeTruthy();
    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds[0].description.includes('aaa')).not.toBeTruthy();
});