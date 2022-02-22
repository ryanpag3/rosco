import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BannedWordCache from '../service/banned-word-cache';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const BannedWordsDelete: Command = {
    id: '89b63cbb-9aa4-42f4-bc6c-8e4f33f55be2',
    name: 'banned-words delete',
    handler: async (interaction, user, server) => {
        const word = interaction.options.getString('word', true);

        try {
            await prisma.bannedWord.delete({
                where: {
                    word_serverId: {
                        serverId: server.id,
                        word
                    }
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Banned word not found to delete.');
            throw e;
        }

        await BannedWordCache.baselineWordCacheToDatabase();

        return interaction.reply({
            embeds: [
                {
                    title: `:put_litter_in_its_place: Banned word has been removed.`,
                    description: `**${word}** will no longer be treated as a banned word.`
                }
            ]
        })
    }
};

export default BannedWordsDelete;