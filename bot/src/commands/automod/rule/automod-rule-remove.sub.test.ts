import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';
import prisma from '../../../util/prisma';

it('should delete a new automod rule for banned words', async () => {
    let int = createTestInteraction('automod', ['rule', 'add'], {
        module: 'banned-words',
        action: 'timeout',
        duration: 30,
        violations: 10,
        cooldown: 120
    });

    let r = await onCommandReceived(int);

    let rule = await prisma.autoModRule.findUnique({
        where: {
            serverId_module_action: {
                serverId: r.server.id,
                action: 'timeout',
                module: 'banned-words'
            }
        }
    });

    expect(rule).not.toBeNull();

    int = createTestInteraction('automod', ['rule', 'remove'], {
        module: 'banned-words',
        action: 'timeout'
    });

    r = await onCommandReceived(int);

    rule = await prisma.autoModRule.findUnique({
        where: {
            serverId_module_action: {
                serverId: r.server.id,
                action: 'timeout',
                module: 'banned-words'
            }
        },
        rejectOnNotFound: false
    }) as any;

    expect(rule).toBeNull();
});