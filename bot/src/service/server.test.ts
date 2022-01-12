import * as ServerService from './server';

it('should initialize the server', async () => {
    const server = await ServerService.initializeServer('1234');
    expect(server.discordId).toBe('1234');
});

it('should return gracefully if server is already initializes', async () => {
    const server = await ServerService.initializeServer('1234');
    expect(server.discordId).toBe('1234');

    const server2 = await ServerService.initializeServer('1234');
    expect(server2.discordId).toBe('1234');
});