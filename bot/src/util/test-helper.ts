import { CommandInteraction, InteractionReplyOptions, MessagePayload } from 'discord.js';

// add fields as necessary
export function createTestInteraction(commandName: string): CommandInteraction {
    return {
        commandName,
        reply: (options: string | InteractionReplyOptions | MessagePayload) => {
            return new Promise((res, rej) => {
                return res();
            });
        }
    } as CommandInteraction;
}