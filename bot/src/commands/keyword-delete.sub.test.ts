import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should delete the keyword', async () => {
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

    let keywords = await prisma.keyword.findMany({
        where: {}
    });

    expect(keywords.length).toBe(1);

    int = createTestInteraction('keyword', 'delete', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin'
    }, '1');

    await onCommandReceived(int);

    keywords = await prisma.keyword.findMany({
        where: {}
    });

    expect(keywords.length).toBe(0);
});

it('should thrown an error if the score does not exist', async () => {
    const int = createTestInteraction('keyword', 'delete', {
        'score-name': 'test',
        keyword: 'iwinagainlewstherin'
    }, '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
});