import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';
import prisma from '../../../util/prisma';

it('it should disable banned word detection in the server', async () => {
    const int = createTestInteraction('automod', ['banned-words', 'disable']);

    const r = await onCommandReceived(int);

    const s = await prisma.server.findUnique({
        where: {
            id: r.server.id
        }
    });

    expect(s.autoModBannedWordsEnabled).toBeFalsy();
});