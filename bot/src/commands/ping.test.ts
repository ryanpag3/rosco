import { createTestInteraction } from '../util/test-helper'
import onCommandReceived from '../event/interaction-create';

it('should ping the bot', async () => {
    let int = createTestInteraction('ping');
    await onCommandReceived(int);
})