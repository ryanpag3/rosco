import { MessageReaction, PartialMessageReaction, PartialUser, User as DiscordUser } from 'discord.js';
import { undoMessageReactionIncome } from '../service/currency';

export const onMessageReactionRemove = async (
    reaction: MessageReaction|PartialMessageReaction,
    user: DiscordUser|PartialUser
    ) => {
    await undoMessageReactionIncome(reaction, user);   
}