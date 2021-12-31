import { CommandInteraction, InteractionReplyOptions, MessageOptions, MessagePayload } from 'discord.js';

// add fields as necessary
export function createTestInteraction(commandName: string): CommandInteraction {
    return {
        commandName,
        isCommand: () => true,
        channel: {
            send: (options: string | MessagePayload | MessageOptions) => {
                return new Promise((res, rej) => {
                    return res({
                        // @ts-ignore
                        options,
                        send: () => {
                            return {
                                delete: () => true
                            }
                        }
                    });
                });
            }
        },
        reply: (options: string | InteractionReplyOptions | MessagePayload) => {
            return new Promise((res, rej) => {
                return res(options as any);
            });
        }
    } as CommandInteraction;
}

export const getApiResult = (apiSpy: any): Promise<any> => {
    return apiSpy.mock.results[0].value
};