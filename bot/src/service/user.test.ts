import * as UserService from './user';

it('should create a user', async () => {
    const u = await UserService.createIfNotExist('abcd');

    expect(u).not.toBeNull();
});

it('should upsert gracefully if user already exists', async () => {
    const u = await UserService.createIfNotExist('abcd');

    expect(u).not.toBeNull();

    await UserService.createIfNotExist('abcd');
})