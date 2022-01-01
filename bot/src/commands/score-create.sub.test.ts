import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should create a valid server score', async () => {
    const int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    });
    
    await onCommandReceived(int);

    const score = await prisma.score.findUnique({
        where: {
            name_serverId: {
                // @ts-ignore
                name: int.options.name,
                // @ts-ignore
                serverId: int.guild?.id,
            }
        }
    });

    expect(score).not.toBeNull();
    expect(score).not.toBeUndefined();
});

it('should throw an error if two scores in the same server have the same name', async () => {
    const int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    });
    
    await onCommandReceived(int);

    const score = await prisma.score.findUnique({
        where: {
            name_serverId: {
                // @ts-ignore
                name: int.options.name,
                // @ts-ignore
                serverId: int.guild?.id,
            }
        }
    });

    expect(score).not.toBeNull();
    expect(score).not.toBeUndefined();

    await expect(onCommandReceived(int)).rejects.toThrowError();
});

it('should create a valid channel score', async () => {
    const int = createTestInteraction('score', 'create', {
        name: 'test',
        description: 'description',
        amount: 1
    });
    
    await onCommandReceived(int);

    const score = await prisma.score.findUnique({
        where: {
            name_serverId: {
                // @ts-ignore
                name: int.options.name,
                // @ts-ignore
                serverId: int.guild?.id,
            }
        }
    });

    expect(score).not.toBeNull();
    expect(score).not.toBeUndefined();
});

