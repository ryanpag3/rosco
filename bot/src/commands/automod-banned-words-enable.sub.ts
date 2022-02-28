import { Command } from '../../types/command';
import { toggleAutoModModule } from '../service/auto-mod';

const BannedWordsEnable: Command = {
    id: '8a0850e5-1174-47b2-b751-8c0241ef6977',
    name: 'banned-words enable',
    handler: async (interaction, user, server) => {
        return toggleAutoModModule(interaction, server, 'autoModBannedWordsEnabled', true);
    }
};

export default BannedWordsEnable;