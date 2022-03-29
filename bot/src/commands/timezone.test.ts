import onInteractionCreate from '../event/interaction-create';
import prisma from '../util/prisma';
import { createTestInteraction } from '../util/test-helper'

it('should set the server timezone', async () => {
    const int = createTestInteraction('timezone', undefined, {
        set: 'America/Los_Angeles'
    });

    const r = await onInteractionCreate(int);

    const updated = await prisma.server.findUnique({
        where: {
            id: r.server.id
        }
    });

    expect(updated.timezone).toBe('America/Los_Angeles');
});

it('should throw an error if an invalid timezone is provided', async () => {
    const int = createTestInteraction('timezone', undefined, {
        set: 'iwinagainlewstherin'
    });

    await expect(onInteractionCreate(int)).rejects.toThrow(); 
});