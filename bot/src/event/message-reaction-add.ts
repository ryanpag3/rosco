import { MessageReaction, PartialMessageReaction } from 'discord.js';
import { CurrencyAction, handleCurrencyEvent } from '../service/currency'
import logger from '../util/logger';

export const onMessageActionAdd = async (reaction: MessageReaction|PartialMessageReaction) => {
    await handleCurrencyEvent(CurrencyAction.REACTION, reaction.message, reaction);
}