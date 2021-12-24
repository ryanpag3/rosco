import { CommandInteraction } from 'discord.js';

export interface Command {
    name: string;
    description: string;
    examples: string;
    handler: (interaction: CommandInteraction) => void;
}