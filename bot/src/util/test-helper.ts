import { CommandInteraction, InteractionReplyOptions, Message, MessageOptions, MessagePayload, MessageReaction, User } from 'discord.js';

// add fields as necessary
export function createTestInteraction(commandName: string, 
    subcommandName?: string|string[], options?: any, 
    serverId?: string, channelId?: string, 
    staticUserId?: string): CommandInteraction {
    const userId = staticUserId || '1';
    let sName = subcommandName;
    let sGroup: any;

    if (typeof subcommandName !== 'string' && (subcommandName as string[])?.length > 1) {
        sName = (subcommandName as string[])[1];
        sGroup = (subcommandName as string[])[0];
    }

    return {
        id: '1',
        commandName,
        client: {
            users: {
                fetch: (id: string) => {
                    return {
                        id
                    }
                },
                cache: {
                    get: (id: string) => {
                        return {
                            id
                        }
                    }
                }
            } as any
        },
        isCommand: () => true,
        isButton: () => false,
        // @ts-ignore
        toJSON: () => {},
        channelId:  channelId || '1', 
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
            getInteger: (key: string) => Number.parseInt(options ? options[key] : undefined),
            getSubcommand: () => sName,
            getSubcommandGroup: () => sGroup,
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


export const createTestMessage = (content: string, guildId?: string, userId?: string) => {
    const id = '1';
    return {
        id,
        content,
        member: {
            id: userId || id,
            user: {
                id: userId || id
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
        guild: {
            id: guildId || id,
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
        },

    } as Message<boolean>
}

export const createTestReaction = (emoji: string) => {
    return {
        message: createTestMessage(emoji),
        emoji: {
            name: emoji
        }
    } as MessageReaction
}

export const createTestUser = (userId?: string) => {
    return { 
        id: userId || '1'
    } as User;
}