import { Guild } from 'discord.js';
import * as ServerService from './server';

it('should initialize the server', async () => {
    const server = await ServerService.initializeServer(makeGuild('1234'));
    expect(server?.discordId).toBe('1234');
});

it('should return gracefully if server is already initializes', async () => {
    const server = await ServerService.initializeServer(makeGuild('1234'));
    expect(server?.discordId).toBe('1234');

    const server2 = await ServerService.initializeServer(makeGuild('1234'));
    expect(server2?.discordId).toBe('1234');
});

const makeGuild = (id: string) => {
    return {
        id,
        roles: {
            cache: {
                find: (a: any) => { 
                    return {
                        id
                    }
                }
            }
        }
    } as Guild
}