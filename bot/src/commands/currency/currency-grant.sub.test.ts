import onInteractionCreate from '../../event/interaction-create';
import prisma from '../../util/prisma';
import { createTestInteraction } from '../../util/test-helper';

it('should grant a user currency', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '1'
        }
    });

    await onInteractionCreate(int);

    const user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        },
        rejectOnNotFound: false
    });

    expect(user?.UserServer[0].currencyCount).toBe(2);
});

it('should throw an error if amount is below 0', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '1'
        },
        amount: -1
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});

it('should grant a user currency by amount', async () => {
    let int = createTestInteraction('currency', 'grant', {
        user: {
            id: '1'
        },
        amount: 100000
    });

    await onInteractionCreate(int);

    const user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        },
        rejectOnNotFound: false
    });

    expect(user?.UserServer[0].currencyCount).toBe(100001);
});
