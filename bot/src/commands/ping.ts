import { Command } from '../../types/command';

const Ping: Command = {
    name: 'ping',
    description: 'Ping the bot and get the latency.',
    examples: '`/ping`',
    handler: async (interaction) => {
        const msg = await interaction.channel?.send('Checking latency...');
        if (!msg)
            throw new Error(`Could not check latency.`);
        await msg?.delete();
        await interaction.reply(`Server latency is ${msg?.createdTimestamp - interaction.createdTimestamp}ms.`);
    }
};

export default Ping;