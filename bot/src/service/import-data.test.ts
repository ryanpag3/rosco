import logger from '../util/logger';
import { generateScoreBotData } from '../util/test-helper';

it('should import data from score bot', async () => {
    const data = generateScoreBotData(1000, 1000, 1000);

    logger.info(data);
});