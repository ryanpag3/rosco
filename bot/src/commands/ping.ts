import { Command } from '../../types/command';
import BotError from '../util/bot-error';

const Ping: Command = {
    name: 'ping',
    description: 'Ping the bot and get the latency.',
    examples: '`/ping`',
    handler: async (interaction) => {
        const msg = await interaction.channel?.send('Checking latency...');
        if (!msg)
            throw new BotError(`Could not check latency.`);
        await msg?.delete();
        await interaction.channel?.send({ embeds: [
            {
                description: `Server latency is ${msg?.createdTimestamp - interaction.createdTimestamp}ms.`
            }
        ]});
    }
};

export default Ping;