import { Command } from '../../../../types/command';
import { toggleAutoModModule } from '../../../service/auto-mod';

const CapslockDetectDisable: Command = {
    id: 'be849743-e2f5-4169-b08e-338985ddbd7a',
    name: 'capslock-detect disable',
    handler: async (interaction, user, server) => {
        return toggleAutoModModule(interaction, server, 'autoModCapslockDetectEnabled', false);
    }
};

export default CapslockDetectDisable;