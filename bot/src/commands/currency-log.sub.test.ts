import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should list out the recent currency events', async () => {
    let int = createTestInteraction('currency', 'log');

    const spy = jest.spyOn(int, 'reply');

    await onCommandReceived(int);

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});

it('should set the channel id of the channel specified', async () => {
    let int = createTestInteraction('currency', 'log', {
        channel: {
            id: '1'
        }
    });

    const r = await onCommandReceived(int); 

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id
        }
    });

    expect(server?.currencyHistoryChannelId).toBe('1');
});

it('should set logging to inactive', async () => {
    let int = createTestInteraction('currency', 'log', {
        active: false
    });

    await onCommandReceived(int); 

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id
        }
    });

    expect(server?.currencyHistoryChannelActive).toBe(false);
});
