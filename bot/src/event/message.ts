import { Keyword } from '@prisma/client';
import { Message } from 'discord.js';
import { buildKeywordValues, doesKeywordsExist, getValidKeywords } from '../service/keyword-cache';
import logger from '../util/logger';
import prisma from '../util/prisma';

const onMessageReceived = async (message: Message) => {
    if (message.type === 'APPLICATION_COMMAND')
        return;

    await handleKeywords(message);

};

const handleKeywords = async (message: Message) => {
    if (!doesKeywordsExist(message.content))
        return;

    const keywords: Keyword[] = getValidKeywords(message.content, message.guild?.id as string);

    for (const k of keywords) {
        if (k.channelId && k.channelId !== message.channel?.id)
            continue;

        const action = k.action === 'UP' ? 'increment' : 'decrement';

        try {
            const s = await prisma.score.update({
                where: {
                    id: k.scoreId
                },
                data: {
                    amount: {
                        [action]: k.amount
                    }
                }
            });

            logger.debug(`${action}ed ${s.name} by ${k.amount} in ${s.serverId}`);
        } catch (e) {
            logger.error(e);
        }
    }
}

export default onMessageReceived;