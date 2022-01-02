import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should create a scoreboard', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    });

    await onCommandReceived(int);

    const scoreboard = await prisma.scoreboard.findUnique({
        where: {
            name_serverId: {
                name: 'test',
                serverId: int.guild?.id as string
            }
        }
    });

    expect(scoreboard).not.toBeNull();
});

it('should throw an error if a scoreboard already exists with that name', async () => {
    let int = createTestInteraction('scoreboard', 'create', {
        name: 'test'
    }, '1');

    await onCommandReceived(int);

    await expect(onCommandReceived(int)).rejects.toThrow();
});

it('should populate scores that exist', async () => {
    let int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    }, '1');
    
    await onCommandReceived(int);

    int = createTestInteraction('scoreboard', 'create', {
        name: 'test',
        scores: 'test'
    }, '1');

    await onCommandReceived(int);
});

it('should throw an error if a score doesnt exist in the scores option', async () => {
    const int = createTestInteraction('scoreboard', 'create', {
        name: 'test',
        scores: 'test'
    }, '1');

    await expect(onCommandReceived(int)).rejects.toThrow();
})