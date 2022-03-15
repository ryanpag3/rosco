import logger from '../util/logger';
import { generateScoreBotData } from '../util/test-helper';

it('should import data from score bot', async () => {
    const data = generateScoreBotData();

    logger.info(data);
});