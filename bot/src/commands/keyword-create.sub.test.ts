import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should create the keyword', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'create', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin'
    }, '1', '1', '1');

    await onCommandReceived(int);

    const keywords = await prisma.keyword.findMany({
        where: {}
    });

    expect(keywords.length).toBe(1);
});

it('should thrown an error if the score does not exist', async () => {
    const int = createTestInteraction('keyword', 'create', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});

it('should throw an error with an invalid action', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1', '1', '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('keyword', 'create', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin',
        action: 'whoa'
    }, '1', '1', '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});