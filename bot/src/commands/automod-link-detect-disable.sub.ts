import { Command } from '../../types/command';
import { toggleAutoModModule } from '../service/auto-mod';

const LinkDetectDisable: Command = {
    id: 'a0ffcaa3-16db-47fe-9c88-fadad34f5995',
    name: 'link-detect disable',
    handler: async (interaction, user, server) => {
        return toggleAutoModModule(interaction, server, 'autoModLinkDetectEnabled', false);
    }
};

export default LinkDetectDisable;