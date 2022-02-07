import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should delete a poll', async () => {
    let int = createTestInteraction('poll', 'create', {
        name: 't',
        question: 'q',
        'option-1': '1',
        'option-2': '2'
    });

    const r = await onInteractionCreate(int);

    let poll = await prisma.poll.findUnique({
        where: {
            name_serverId: {
                name: 't',
                serverId: r.server.id
            }
        }
    });

    expect(poll).not.toBeNull();

    int = createTestInteraction('poll', 'delete', {
        name: 't'
    });

    await onInteractionCreate(int);

    poll = await prisma.poll.findUnique({
        where: {
            name_serverId: {
                name: 't',
                serverId: r.server.id
            }
        },
        rejectOnNotFound: false
    }) as any;

    expect(poll).toBeNull();
});

it('should throw an error if a poll doesnt exist to delete', async () => {
    const int = createTestInteraction('poll', 'delete', {
        name: 't'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});