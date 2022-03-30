import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';
import prisma from '../../../util/prisma';

it('it should set the capslock length', async () => {
    const int = createTestInteraction('automod', ['capslock-detect', 'config'], {
        length: 25
    });

    const r = await onCommandReceived(int);

    const s = await prisma.server.findUnique({
        where: {
            id: r.server.id
        }
    });

    expect(s.autoModCapslockDetectLength).toBe(25);
});

it('it should set the capslock length to default value', async () => {
    const int = createTestInteraction('automod', ['capslock-detect', 'config']);

    const r = await onCommandReceived(int);

    const s = await prisma.server.findUnique({
        where: {
            id: r.server.id
        }
    });

    expect(s.autoModCapslockDetectLength).toBe(12);
});