import { Guild } from 'discord.js';
import * as ServerService from '../service/server';
import logger from '../util/logger';

export const onGuildCreate = async (guild: Guild) => {
    logger.info(`bot has been added to ${guild.id} with ${guild.memberCount} members`);
    await ServerService.initializeServer(guild.id);    
};