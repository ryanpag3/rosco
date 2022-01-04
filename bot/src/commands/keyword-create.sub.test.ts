import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should create the keyword', async () => {
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

    const keywords = await prisma.keyword.findMany({
        where: {}
    });

    expect(keywords.length).toBe(1);
});