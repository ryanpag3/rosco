import { Command } from '../../types/command';

const TimerDelete: Command = {
    id: 'abaa88e0-9945-44dd-835a-c3cb6b72dad2',
    name: 'timer delete',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        
    }
};

export default TimerDelete;