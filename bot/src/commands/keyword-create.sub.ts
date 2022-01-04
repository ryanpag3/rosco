import { KeywordAction, Prisma } from '@prisma/client';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import * as UserService from '../service/user';

const KeywordCreate: Command = {
    id: '6ec5e902-f482-48a5-879e-7427b8ba5a20',
    name: 'keyword create',
    handler: async (interaction, user) => {
        const keyword = interaction.options.getString('keyword', true);
        const scoreName = interaction.options.getString('score-name', true);
        const action = interaction.options.getString('action');
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.options.getChannel('channel');
        const filterOnUser = interaction.options.getUser('user');

        const score = await prisma.score.findUnique({
            where: {
                name_serverId: {
                    name: scoreName,
                    serverId: interaction.guild?.id as string
                }
            }
        });

        if (!score)
            throw new BotError(`Could not find score to assign keyword to.`);

        if (action && action !== 'UP' && action !== 'DOWN')
            throw new BotError(`Invalid action provided. Only \`UP\` or \`DOWN\` are allowed.`);

        let inDbUser;

        if (filterOnUser) {
            inDbUser = await prisma.user.findUnique({
                where: {
                    discordId: user.id
                }
            });

            if (!inDbUser) {
                inDbUser = await UserService.createIfNotExist(user.id);
            }
        }

        try {
            await prisma.keyword.create({
                data: {
                    keyword,
                    scoreId: score.id,
                    serverId: interaction.guild?.id as string,
                    channelId: channel?.id,
                    amount: amount || undefined,
                    action: action as KeywordAction || undefined,
                    userId: inDbUser?.id
                }
            });

            return interaction.reply({
                embeds: [
                    {
                        title: `:bookmark: Keyword assigned successfully.`,
                        description: `Now, when **${keyword}** is typed in chat the score **${scoreName}** will be modified.`
                    }
                ]
            })
        } catch (e) {
            if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
                throw e;
            } else {
                if (e.code === 'P2002') {
                    throw new BotError(`A keyword already exists with that configuration.`);
                }
                throw e;
            }
        }

    }
};

export default KeywordCreate;