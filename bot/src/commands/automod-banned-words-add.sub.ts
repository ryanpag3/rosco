import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const BannedWordsAdd: Command = {
    id: '147f53a3-7bb3-4a78-9ee5-ed5425557ad9',
    name: 'banned-words add',
    handler: async (interaction, user, server) => {
        const word = interaction.options.getString('word', true);

        try {
            await prisma.bannedWord.create({
                data: {
                    serverId: server.id,
                    word
                }
            });
        } catch (e) {
            if((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT)
                throw new BotError(`That word is already included in the banned word list.`);
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:stop_sign: A word has been included in the banned words list.`,
                    description: `**${word}** is now banned.\n\n To configure actions to take when this word is used, please use \`/automod rule add\``
                }
            ]
        });

    }
};

export default BannedWordsAdd;