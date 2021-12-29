import { CommandInteraction } from 'discord.js';
import { createTestInteraction } from '../util/test-helper';
import onCommandReceived from '../event/interaction-create';

it('should do thing', () => {
    const int = createTestInteraction('bing');
    onCommandReceived(int);
});