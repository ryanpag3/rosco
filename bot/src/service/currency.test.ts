import onInteractionCreate from '../event/interaction-create';
import onMessageReceived from '../event/message';
import { onMessageActionAdd } from '../event/message-reaction-add';
import { onMessageReactionRemove } from '../event/message-reaction-remove';
import prisma from '../util/prisma';
import { createTestInteraction, createTestMessage, createTestReaction, createTestUser } from '../util/test-helper';
import * as UserService from '../service/user';

it('should grant the user currency for issuing a command', async () => {
    let int = createTestInteraction('score', 'list');

    await onInteractionCreate(int);

    const user = await prisma.user.findUnique({
            where: {
                discordId: '1'
            },
            include: {
                UserServer: true
            }
    });

    expect(user?.UserServer[0].currencyCount).toBe(1);
});

it('should grant the user currency for sending a message', async () => {
    let msg = createTestMessage('content');
    
    await onMessageReceived(msg);

    const user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].currencyCount).toBe(1);
});

it('should grant the user currency for reacting to a message', async () => {
    let reaction = createTestReaction(':grin:');

    await onMessageActionAdd(reaction, createTestUser());

    const user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].currencyCount).toBe(1);

});

it('should remove currency that was granted by reaction to a message when the reaction is removed', async () => {
    let reaction = createTestReaction(':grin:');

    await onMessageActionAdd(reaction, createTestUser());

    let user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        }
    });

    expect(user?.UserServer[0].currencyCount).toBe(1);

    await onMessageReactionRemove(reaction, createTestUser());

    user = await prisma.user.findUnique({
        where: {
            discordId: '1'
        },
        include: {
            UserServer: true
        }
    }); 

    expect(user?.UserServer[0].currencyCount).toBe(0);
})