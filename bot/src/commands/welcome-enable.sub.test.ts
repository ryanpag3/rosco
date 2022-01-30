import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should enable private welcome messages', async () => {
    let int = createTestInteraction('welcome', 'set', {
        type: 'private',
        channel: {
            id: 'asdasd'
        },
        title: 'yo!',
        message: 'Welcome!'
    });

    await onInteractionCreate(int);

    int = createTestInteraction('welcome', 'enable', {
        type: 'private',
        channel: {
            id: '1'
        }
    });

    await onInteractionCreate(int);

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id as string
        },
        include: {
            ServerWelcomeMessage: true
        }
    });

    expect(server?.ServerWelcomeMessage[0].isEnabled).toBeTruthy();
});

it('should enable public welcome messages', async () => {
    let int = createTestInteraction('welcome', 'set', {
        type: 'public',
        channel: {
            id: 'asdasd'
        },
        title: 'yo!',
        message: 'Welcome!'
    });

    await onInteractionCreate(int);

    int = createTestInteraction('welcome', 'enable', {
        type: 'public'
    });

    await onInteractionCreate(int);

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id as string
        },
        include: {
            ServerWelcomeMessage: true
        }
    });

    expect(server?.ServerWelcomeMessage[0].isEnabled).toBeTruthy();
});

it('should throw an error if an invalid type is provided', async () => {
    let int = createTestInteraction('welcome', 'enable', {
        type: 'asdasd'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});
