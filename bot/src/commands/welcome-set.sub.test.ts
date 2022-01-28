import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper';

it('should disable private welcome messages', async () => {
    let int = createTestInteraction('welcome', 'set', {
        type: 'private',
        message: 'Welcome!'
    });

    await onInteractionCreate(int);

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id as string
        }
    });

    expect(server?.privateWelcomeMessage).not.toBeUndefined();
});

it('should disable public welcome messages', async () => {
    let int = createTestInteraction('welcome', 'set', {
        type: 'public',
        message: 'Welcome!'
    });

    await onInteractionCreate(int);

    const server = await prisma.server.findUnique({
        where: {
            discordId: int.guild?.id as string
        }
    });

    expect(server?.publicWelcomeMessage).not.toBeUndefined();
});


it('should throw an error if an invalid type is provided', async () => {
    let int = createTestInteraction('welcome', 'set', {
        type: 'asdasd'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow();
});