import { Command } from '../../types/command';

const Bing: Command = {
    id: 'e89f0e9b-97a2-4d59-9318-b8eed334f2bc',
    name: 'bing',
    description: 'Joe Byron?',
    examples: `\`/bing\``,
    handler: async (interaction, user) => {
        return interaction.reply('bong');
    }
};

export default Bing;