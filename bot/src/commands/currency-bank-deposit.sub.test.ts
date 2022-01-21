import onInteractionCreate from '../event/interaction-create';
import logger from '../util/logger';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should deposit currency to the bank', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '1'
        },
        amount: 100
    });

    await onInteractionCreate(int);

    int = createTestInteraction('currency', 'deposit', {
        amount: 1
    });

    await onInteractionCreate(int);

    const user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].bankCurrencyCount).toBe(1);
});

it('should error if not enough currency is available to deposit', async () => {
    let int = createTestInteraction('currency', 'deposit', {
        amount: 100
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});

it('should error if amount is negative', async () => {
    let int = createTestInteraction('currency', 'deposit', {
        amount: -100
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});

