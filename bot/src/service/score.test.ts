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

it('should throw a BotError if a score already exists in the server', async () => {
    const u = await UserService.createIfNotExist('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id
    });

    await expect(ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id
    })).rejects.toThrow();
});

it('should update a score', async () => {
    const u = await UserService.createIfNotExist('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id
    });

    expect(s.id).not.toBeUndefined();

    const updated = await ScoreService.update(s.name, {
        description: 'new'
    });

    expect(updated.description).toBe('new');
});

it('should throw an error if updating a score to an existing name', async () => {
    const u = await UserService.createIfNotExist('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id
    });

    expect(s.id).not.toBeUndefined();

    const ss = await ScoreService.create({
        name: 'testing2',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id
    });

    expect(ss.id).not.toBeUndefined();

    await expect(ScoreService.update(s.name, {
        name: 'testing2'
    })).rejects.toThrow();
});

it('should get a score record', async () => {
    const u = await UserService.createIfNotExist('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id
    });

    expect(s.id).not.toBeUndefined();

    const found = await ScoreService.getUnique({
        name: s.name
    });

    expect(found?.id).toBe(s.id);
});

it('should return null when a record does not exist', async () => {
    const found = await ScoreService.getUnique({
        name: 'abc'
    });

    expect(found).toBeNull();
});