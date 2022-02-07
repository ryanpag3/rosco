import { Command } from '../../types/command';
import { toggleBannedWordsRule } from '../service/banned-words';

const BannedWordsEnable: Command = {
    id: '6f267410-d646-432e-8ad9-6754c873e204',
    name: 'banned-words enable',
    handler: async (interaction, user, server) => {
        return toggleBannedWordsRule(interaction, user, server, true);
    }
};

export default BannedWordsEnable;