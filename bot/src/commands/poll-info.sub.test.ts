import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should get info on a poll', async () => {
    const name = 't';
    let int = createTestInteraction('poll', 'create', {
        name,
        question: 'q',
        'option-1': '1',
        'option-2': '2'
    });

    const r = await onInteractionCreate(int);

    const poll = await prisma.poll.findUnique({
        where: {
            name_serverId: {
                name: 't',
                serverId: r.server.id
            }
        }
    });

    expect(poll).not.toBeNull();

    int = createTestInteraction('poll', 'info', {
        name
    })

    const spy = jest.spyOn(int, 'reply');

    await onInteractionCreate(int);

    // @ts-ignore
    expect(spy.mock.calls[0][0].embeds.length).toBe(1);
});

it('should throw an error if a poll does not exist', async () => {
    const int = createTestInteraction('poll', 'info', {
        name: 'waht'
    })

    await expect(onInteractionCreate(int)).rejects.toThrow();
});