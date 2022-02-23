import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('it should enable capslock detection in the server', async () => {
    const int = createTestInteraction('automod', ['capslock-detect', 'enable']);

    const r = await onCommandReceived(int);

    const s = await prisma.server.findUnique({
        where: {
            id: r.server.id
        }
    });

    expect(s.autoModCapslockDetectEnabled).toBeTruthy();
});