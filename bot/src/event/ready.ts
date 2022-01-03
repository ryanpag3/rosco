import client from '..';
import logger from '../util/logger';
import packageJson from '../../package.json';

export default async function () {
    logger.info(`🥑🥑🥑 Guac Bot is online and ready for action! 🥑🥑🥑`);

    client.user?.setActivity(`v${packageJson.version}`);
}