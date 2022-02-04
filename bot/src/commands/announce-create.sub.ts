import * as chrono from 'chrono-node';
import { DateTime } from 'luxon';
import { Command } from '../../types/command';
import logger from '../util/logger';

const AnnounceCreate: Command = {
    id: '4575b923-4875-4b76-8914-a44a3c7dce1a',
    name: 'announce create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const when = interaction.options.getString('when', true);

        const whenDate = chrono.parseDate(when);

        logger.info(DateTime.fromJSDate(whenDate).setZone(server.timezone).toJSON());

        
    
    }
};

export default AnnounceCreate;