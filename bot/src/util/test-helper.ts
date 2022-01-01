import { CommandInteraction, InteractionReplyOptions, MessageOptions, MessagePayload } from 'discord.js';
import logger from './logger';

// add fields as necessary
export function createTestInteraction(commandName: string): CommandInteraction {
    return {
        commandName,
        isCommand: () => true,
        // @ts-ignore
        toJSON: () => JSON.stringify(this as any),
        channel: {
            send: async (options: string | MessagePayload | MessageOptions) => {
                    return {
                        // @ts-ignore
                        options,
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
            id: makeid(18)
        }
    } as CommandInteraction;
}

export const getApiResult = (apiSpy: any): Promise<any> => {
    return apiSpy.mock.results[0].value
};

function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}