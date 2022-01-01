import * as UserService from './user';
import * as ScoreService from './score';

it('should create a score', async () => {
    const u = await UserService.createIfNotExist('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id
    });

    expect(s.id).not.toBeUndefined();
});