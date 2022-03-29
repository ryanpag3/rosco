import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';
import prisma from '../../../util/prisma';

it('should create a new automod rule for banned words', async () => {
    let int = createTestInteraction('automod', ['rule', 'add'], {
        module: 'banned-words',
        action: 'timeout',
        duration: 30,
        violations: 10,
        cooldown: 120
    });

    const r = await onCommandReceived(int);

    const rule = await prisma.autoModRule.findUnique({
        where: {
            serverId_module_action: {
                serverId: r.server.id,
                action: 'timeout',
                module: 'banned-words'
            }
        }
    });

    expect(rule).not.toBeNull();
});

it('It should throw an error if an invalid module is provided.', async () => {
    let int = createTestInteraction('automod', ['rule', 'add'], {
        module: 'iwinagainlewstherin',
        action: 'timeout',
        duration: 30,
        violations: 10,
        cooldown: 120
    });

    await expect(onCommandReceived(int)).rejects.toThrow(); 
});

it('It should throw an error if an invalid action is provided.', async () => {
    let int = createTestInteraction('automod', ['rule', 'add'], {
        module: 'banned-words',
        action: 'iwinagainlewstherin',
        duration: 30,
        violations: 10,
        cooldown: 120
    });

    await expect(onCommandReceived(int)).rejects.toThrow(); 
});

it('It should throw an error if a rule already exists', async () => {
    let int = createTestInteraction('automod', ['rule', 'add'], {
        module: 'banned-words',
        action: 'timeout',
        duration: 30,
        violations: 10,
        cooldown: 120
    });

    const r = await onCommandReceived(int);

    const rule = await prisma.autoModRule.findUnique({
        where: {
            serverId_module_action: {
                serverId: r.server.id,
                action: 'timeout',
                module: 'banned-words'
            }
        }
    });

    expect(rule).not.toBeNull();

    int = createTestInteraction('automod', ['rule', 'add'], {
        module: 'banned-words',
        action: 'timeout',
        duration: 30,
        violations: 10,
        cooldown: 120
    });

    await expect(onCommandReceived(int)).rejects.toThrow(); 
});

