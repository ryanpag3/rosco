import { MessageReaction, PartialMessageReaction, PartialUser, User as DiscordUser } from 'discord.js';

export const onMessageReactionRemove = async (
    reaction: MessageReaction|PartialMessageReaction,
    user: DiscordUser|PartialUser
    ) => {
}