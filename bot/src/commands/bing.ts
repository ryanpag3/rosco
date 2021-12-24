import { Command } from '../../types/command';

const Bing: Command = {
    name: 'bing',
    description: 'Joe Byron?',
    examples: `\`/bing\``,
    handler: async (interaction) => {
        return interaction.reply('bong');
    }
};

export default Bing;