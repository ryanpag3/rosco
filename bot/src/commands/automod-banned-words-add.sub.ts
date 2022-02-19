import { Command } from '../../types/command';
import { getRuleOptions } from '../service/auto-mod';

const BannedWordsAdd: Command = {
    id: '147f53a3-7bb3-4a78-9ee5-ed5425557ad9',
    name: 'banned-words add',
    handler: async (interaction, user, server) => {
        const word = interaction.options.getString('word');
        const ruleOptions = getRuleOptions(interaction);

                

    }
};

export default BannedWordsAdd;