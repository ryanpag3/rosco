import { createTestInteraction, getApiResult } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';
import prisma from '../util/prisma';

it('should reply with bong when called', async () => {
    const int = createTestInteraction('bing');
    const spy = jest.spyOn(int, 'reply');
    await onCommandReceived(int);
    expect(spy).toHaveBeenCalled();
    expect(await getApiResult(spy)).toBe('bong');
});

it('should initialize the user to the database', async () => {
    const int = createTestInteraction('bing');
    const spy = jest.spyOn(int, 'reply');
    await onCommandReceived(int);
    expect(spy).toHaveBeenCalled();
    expect(await getApiResult(spy)).toBe('bong');
    const user = await prisma.user.findUnique({
        where: {
            discordId: int.user.id
        }
    });
    expect(user).not.toBeNull();
})