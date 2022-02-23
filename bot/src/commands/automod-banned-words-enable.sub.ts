import { Command } from '../../types/command';
import { toggleAutoModModule } from '../service/auto-mod';

const BannedWordsEnable: Command = {
    id: '6f267410-d646-432e-8ad9-6754c873e204',
    name: 'banned-words enable',
    handler: async (interaction, user, server) => {
        return toggleAutoModModule(interaction, server, 'autoModBannedWordsEnabled', true);
    }
};

export default BannedWordsEnable;