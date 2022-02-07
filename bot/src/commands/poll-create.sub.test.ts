import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should create a poll', async () => {
    let int = createTestInteraction('poll', 'create', {
        name: 't',
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
});

it('should throw an error if only one option is provided', async () => {
    let int = createTestInteraction('poll', 'create', {
        name: 't',
        question: 'q',
        'option-1': '1'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});

