import { Command } from '../../types/command';
import BotError from '../util/bot-error';

enum MODULE {
    BANNED_WORDS = 'banned-words'
}

const RuleAdd: Command = {
    id: 'b5a6c7a4-d898-4cdf-9c10-c3bc901f9b30',
    name: 'rule add',
    handler: async (interaction, user, server) => {
        const module = interaction.options.getString('module', true);
        const action = interaction.options.getString('action', true);
        const duration = interaction.options.getInteger('duration', true);
        const violations = interaction.options.getInteger('violations', true);

        if(!Object.values(MODULE).some((v) => v === module))
            throw new BotError('Invalid module provided. Valid options are: \n' + Object.values(MODULE).join('\n'));

        
        interaction.reply('ok');
    }
};

export default RuleAdd;