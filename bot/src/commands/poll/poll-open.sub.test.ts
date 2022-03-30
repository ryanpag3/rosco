import onInteractionCreate from '../../event/interaction-create';
import prisma from '../../util/prisma';
import { createTestInteraction } from '../../util/test-helper';

it('should open a poll', async () => {
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
    

    int = createTestInteraction('poll', 'open', {
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

    expect(poll?.isOpen).toBeTruthy();
});

it('should throw an error if the poll does not exist', async () => {
    let int = createTestInteraction('poll', 'open', {
        name: 't',
    });

    await expect(onInteractionCreate(int)).rejects.toThrow(); 
});