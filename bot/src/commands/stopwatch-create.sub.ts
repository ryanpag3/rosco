import { Command } from '../../types/command';

const StopwatchCreate: Command  = {
    id: '00923569-fbc4-4ccf-a8ba-c625eaa5cbea',
    name: 'stopwatch create',
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name');
        const startOnCreate = interaction.options.getBoolean('')
    }
}

export default StopwatchCreate;