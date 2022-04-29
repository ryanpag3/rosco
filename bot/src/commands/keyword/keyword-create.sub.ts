import { KeywordAction } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import KeywordCache from '../../service/keyword-cache';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const KeywordCreate: Command = {
    id: '6ec5e902-f482-48a5-879e-7427b8ba5a20',
    name: 'keyword create',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const word = interaction.options.getString('keyword', true);
        const scoreName = interaction.options.getString('score-name', true);
        const action = interaction.options.getString('action');
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.options.getChannel('channel');
        const filterOnUser = interaction.options.getUser('user');
        const role = interaction.options.getRole('role');
        const announceChannel = interaction.options.getChannel('announce-channel');

        if (action && action !== 'UP' && action !== 'DOWN')
            throw new BotError(`Invalid action provided. Only \`UP\` or \`DOWN\` are allowed.`);

        let score;
        try {
            score = await prisma.score.findUnique({
                where: {
                    name_serverId: {
                        name: scoreName,
                        serverId: server?.id as string
                    }
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Could not find score to assign keyword to.');
        }

        let inDbUser;
        try {
            if (filterOnUser) {
                inDbUser = await prisma.user.findUnique({
                    where: {
                        discordId: user.id
                    }
                });
            }
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.NOT_FOUND)
                throw new BotError('Could not find user to filter on.');
        }

        try {
            if (!server)
                throw new Error(`Server instance not instantiated. Keyword functionality has been disabled.`);

            const data = {
                name,
                word,
                scoreId: score?.id as string,
                serverId: server?.id as string,
                channelId: channel?.id,
                amount: amount || undefined,
                action: action as KeywordAction || undefined,
                userId: inDbUser?.id,
                roleId: role?.id,
                announceChannelId: announceChannel?.id
            }; 

            const existingKeyword = await prisma.keyword.findFirst({
                where: data,
                rejectOnNotFound: false
            });

            if (existingKeyword)
                throw new BotError(`A keyword already exists with that configuration.`);

            const keywordRecord = await prisma.keyword.create({
                data
            });

            await KeywordCache.cacheRecord(keywordRecord);

            return interaction.reply({
                embeds: [
                    {
                        title: `:bookmark: Keyword assigned successfully.`,
                        description: `Now, when **${word}** is typed in chat the score **${scoreName}** will be modified.`
                    }
                ]
            })
        } catch (e) {
            throw e;
        }
    }
};

export default KeywordCreate;