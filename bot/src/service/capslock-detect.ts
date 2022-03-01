import { Server } from '@prisma/client';
import { Message } from 'discord.js';

export const validateCapslock = async (message: Message, server: Server) => {
    if (server.autoModCapslockDetectEnabled === false)
        return true;

    const [ longestCapsSegment ] = message.content.split(/[a-z\s]{1,}/).sort((a, b) => {
        if (a.length < b.length)
            return -1;
        if (b.length < a.length)
            return 1;
        
        return 0;
    });

    // if (longestCapsSegment >= server.autoModCapslockDetectLength)

}

export const isValidAmountOfCapslock = (content: string, maxLength: number) => {
    const capsLen = content.split(/[a-z\s]{1,}/).join('').length;
    return capsLen <= maxLength;
}