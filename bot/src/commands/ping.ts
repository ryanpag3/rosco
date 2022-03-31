import { Command } from '../../types/command';
import BotError from '../util/bot-error';

const Ping: Command = {
    id: 'e2afcc98-a6a1-4222-8478-6a08e4c0ddf6',
    name: 'ping',
    description: 'Ping the bot and get the latency.',
    examples: '`/ping`',
    handler: async (interaction, _user) => {
        const msg = await interaction.channel?.send('Checking latency...');
        if (!msg)
            throw new BotError(`Could not check latency.`);
        await msg?.delete();
        await interaction.reply({ embeds: [
            {
                description: `Server latency is ${msg?.createdTimestamp - interaction.createdTimestamp}ms.`
            }
        ]});
    }
};

export default Ping;