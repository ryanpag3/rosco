import * as UserService from './user';
import * as ScoreService from './score';
import prisma from '../util/prisma';

it('should create a score', async () => {
    const u = await createUser('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    expect(s.id).not.toBeUndefined();
});

it('should throw a BotError if a score already exists in the server', async () => {
    const u = await createUser('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    await expect(ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    })).rejects.toThrow();
});

it('should update a score', async () => {
    const u = await createUser('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    expect(s.id).not.toBeUndefined();

    const updated = await ScoreService.update(s.name, 'abcd', {
        description: 'new'
    });

    expect(updated.description).toBe('new');
});

it('should throw an error if updating a score to an existing name', async () => {
    const u = await createUser('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    expect(s.id).not.toBeUndefined();

    const ss = await ScoreService.create({
        name: 'testing2',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    expect(ss.id).not.toBeUndefined();

    await expect(ScoreService.update(s.name, 'abcd', {
        name: 'testing2'
    })).rejects.toThrow();
});

it('should get a score record', async () => {
    const u = await createUser('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    expect(s.id).not.toBeUndefined();

    const found = await ScoreService.findUnique({
        name_serverId: {
                name: s.name,
                serverId: s.serverId
        }
    });

expect(found?.id).toBe(s.id);
});

it('should return null when a record does not exist', async () => {
    await expect(ScoreService.findUnique({
        name_serverId: {
            name: 'abc',
            serverId: 'abc'
        }
    })).rejects.toThrow();
});

it('should delete the score', async () => {
    const u = await createUser('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    expect(s.id).not.toBeUndefined();

    await ScoreService.del({
        name: 'testing',
        serverId: 'abcd'
    });

    await expect(ScoreService.findUnique({
        name_serverId: {
            name: s.name,
            serverId: s.serverId
        }
    })).rejects.toThrow();
});

it('should do nothing if no valid scores are available to delete', async () => {
    const u = await createUser('abcd');

    const s = await ScoreService.create({
        name: 'testing',
        serverId: 'abcd',
        channelId: 'abcd',
        // @ts-ignore
        userId: u.id,
        color: '#0'
    });

    expect(s.id).not.toBeUndefined();

    await ScoreService.del({
        name: 'iwinagainlewstherin'
    });

    const found = await ScoreService.findUnique({
        id: s.id
    });

    expect(found).not.toBeNull();
});

const createUser = async (discordId: string) => {
    return prisma.user.create({
        data: {
            discordId
        }
    });
}