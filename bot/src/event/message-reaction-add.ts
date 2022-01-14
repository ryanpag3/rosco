import { MessageReaction, PartialMessageReaction, PartialUser, User as DiscordUser } from 'discord.js';
import { CurrencyAction, handleCurrencyEvent } from '../service/currency'
import logger from '../util/logger';

export const onMessageActionAdd = async (
    reaction: MessageReaction|PartialMessageReaction, 
    user: DiscordUser|PartialUser) => {
    await handleCurrencyEvent(CurrencyAction.REACTION, reaction.message, reaction, user);
}