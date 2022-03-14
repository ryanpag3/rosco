import axios from 'axios';
import { Command } from '../../types/command';
import { importDataFromScoreBot } from '../service/import-data';
import logger from '../util/logger';

const Import: Command = {
    id: '4845d094-1b1c-4158-a4ba-3efc5736f72e',
    name: 'import',
    description: 'Import your data from discord-score-bot.',
    handler: async (interaction, user, server) => {
        const serverId = interaction.guild?.id;

        const res = await axios.get(process.env.DISCORD_SCORE_BOT_API_URL + '/export', {
            headers: {
                // @ts-ignore
                'Authorization': process.env.DISCORD_SCORE_BOT_MIGRATE_SECRET
            },
            params: {
                serverId
            }
        });

        const { data } = res;
    
        await importDataFromScoreBot(interaction.channel?.id as string, user, server, data);

        return interaction.reply({
            embeds: [
                {
                    title: `:arrow_down: Score Bot data has been imported!`,
                    description: `The following Score Bot items have been imported.

    - Scores
    - Scoreboards
    - Keywords

If there was a conflict during the import process, you may see score or scoreboard names changed. Totally normal!
`
                }
            ]
        });
    }
};

interface ExportData {

}

export default Import;