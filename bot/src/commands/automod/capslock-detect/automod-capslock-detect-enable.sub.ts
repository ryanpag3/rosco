import { Command } from '../../../../types/command';
import { toggleAutoModModule } from '../../../service/auto-mod';

const CapslockDetectEnable: Command = {
    id: '4fdc21ff-9a15-47a8-bc36-030d76fb8ac3',
    name: 'capslock-detect enable',
    handler: async (interaction, user, server) => {
        return toggleAutoModModule(interaction, server, 'autoModCapslockDetectEnabled', true);
    }
};

export default CapslockDetectEnable;