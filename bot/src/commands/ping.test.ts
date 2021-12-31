import logger from '../util/logger';
import { createTestInteraction, getApiResult } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';


it('should ping the bot', async () => {
    let int = createTestInteraction('ping');
    const spy = jest.spyOn(int.channel as any, 'send');
    await onCommandReceived(int);
    const res = await getApiResult(spy);
    logger.info(res);
})