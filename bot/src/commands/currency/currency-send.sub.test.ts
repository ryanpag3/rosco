import onInteractionCreate from '../../event/interaction-create';
import prisma from '../../util/prisma';
import { createTestInteraction } from '../../util/test-helper';

it('should send a user currency', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '1'
        },
        amount: 100
    });

    await onInteractionCreate(int);

    let user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].currencyCount).toBe(101);

    int = createTestInteraction('currency', 'send', {
        to: {
            id: '2'
        },
        amount: 1
    });

    await onInteractionCreate(int);

    user = await prisma.user.findUnique({
        where: {
            discordId: '2'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].currencyCount).toBe(1); 
});

it('should throw an error if trying to send too much currency', async () => {
    const int = createTestInteraction('currency', 'send', {
        to: {
            id: '2'
        },
        amount: 1
    });

    await expect(onInteractionCreate(int)).rejects.toThrow(); 
});