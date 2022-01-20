import onInteractionCreate from '../event/interaction-create';
import logger from '../util/logger';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should grant a user currency', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '2'
        }
    });

    await onInteractionCreate(int);

    const user = await prisma.user.findUnique({
        where: {
            discordId: '2'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].currencyCount).toBe(1);
});

it('should throw an error if amount is below 0', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '2'
        },
        amount: -1
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});

it('should grant a user currency by amount', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '2'
        },
        amount: 100000
    });

    await onInteractionCreate(int);

    const user = await prisma.user.findUnique({
        where: {
            discordId: '2'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].currencyCount).toBe(100000);
});
