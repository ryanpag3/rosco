import { Command } from '../../types/command';
import { toggleAutoModModule } from '../service/auto-mod';

const LinkDetectEnable: Command = {
    id: '699b8cff-f2c8-4edd-b150-4729ee6362a9',
    name: 'link-detect enable',
    handler: async (interaction, user, server) => {
        return toggleAutoModModule(interaction, server, 'autoModLinkDetectEnabled', true);
    }
};

export default LinkDetectEnable;