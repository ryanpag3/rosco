import onInteractionCreate from '../../event/interaction-create';
import prisma from '../../util/prisma';
import { createTestInteraction } from '../../util/test-helper';

it('should close a poll', async () => {
    let int = createTestInteraction('poll', 'create', {
        name: 't',
        question: 'q',
        'option-1': '1',
        'option-2': '2'
    });

    let r = await onInteractionCreate(int);

    let poll = await prisma.poll.findUnique({
        where: {
            name_serverId: {
                name: 't',
                serverId: r.server.id
            }
        }
    });

    expect(poll).not.toBeNull();


    int = createTestInteraction('poll', 'close', {
        name: 't',
    });

    await onInteractionCreate(int);

    poll = await prisma.poll.findUnique({
        where: {
            name_serverId: {
                name: 't',
                serverId: r.server.id
            }
        }
    });

    expect(poll?.isOpen).toBeFalsy();
});

it('should throw an error if the poll does not exist', async () => {
    let int = createTestInteraction('poll', 'close', {
        name: 't',
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});