import { ApplicationCommandOption, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Server, User } from '@prisma/client';

export interface Command {
    id: string;
    name: string;
    description?: string;
    examples?: string;
    options?: any;
    handler: (interaction: CommandInteraction, user: User & {
        UserServer: UserServer[];
    }, server: Server) => void;
}