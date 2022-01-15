import { CommandInteraction, InteractionReplyOptions, MessageOptions, MessagePayload } from 'discord.js';
import logger from './logger';

// add fields as necessary
export function createTestInteraction(commandName: string, subcommandName?: string, options?: any, serverId?: string, channelId?: string, staticUserId?: string): CommandInteraction {
    const userId = staticUserId || '1';
    
    return {
        commandName,
        isCommand: () => true,
        // @ts-ignore
        toJSON: () => {},
        channel: {
            id: channelId || '1',
            send: async (options: string | MessagePayload | MessageOptions) => {
                    return {
                        options: {
                            // @ts-ignore
                            ...options,
                            getSubCommand: () => subcommandName
                        },
                        delete: async () => true as any,
                        send: () => {
                            return {
                                delete: () => true
                            }
                        }
                    } as any;
            }
        },
        reply: (options: string | InteractionReplyOptions | MessagePayload) => {
            return new Promise((res, rej) => {
                return res(options as any);
            });
        },
        user: {
            id: userId,
            tag: 'test-user'
        },
        member: {
            id: userId,
            user: {
                id: userId
            },
            permissions: {
                has: (str: string) => true
            },
            roles: {
                cache: {
                    has: (key: string) => true
                }
            }
        },
        options: {
            ...options,
            // @ts-ignore
            getString: (key: string) => options ? options[key] : null,
            getRole: (key: string) => options ? options[key] : null,
            // @ts-ignore
            getInteger: (key: string) => Number.parseInt(options[key]),
            getSubcommand: () => subcommandName,
            getBoolean: (key: string) => options ? options[key]?.toString() === 'true' : null,
            getUser: (key: string) => options ? options[key] : null,
            getChannel: (key: string) => options ? options[key] : null
        },
        guild: {
            id: serverId || '1',
            roles: {
                fetch: (role: any) => {
                    return {
                        id: '1'
                    }
                },
                cache: {
                    find: (role: any) => {
                        return {
                            id: '1'
                        }
                    }
                }
            } as any
        }
    } as CommandInteraction;
}

export const getApiResult = (apiSpy: any): Promise<any> => {
    return apiSpy.mock.results[0].value
};