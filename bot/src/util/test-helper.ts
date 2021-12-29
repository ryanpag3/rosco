import { CommandInteraction, InteractionReplyOptions, MessagePayload } from 'discord.js';

// add fields as necessary
export function createTestInteraction(commandName: string): CommandInteraction {
    return {
        commandName,
        isCommand: () => true,
        reply: (options: string | InteractionReplyOptions | MessagePayload) => {
            return new Promise((res, rej) => {
                return res(options as any);
            });
        }
    } as CommandInteraction;
}

export const getApiResult = (apiSpy: any): Promise<any> => apiSpy.mock.results[0].value;