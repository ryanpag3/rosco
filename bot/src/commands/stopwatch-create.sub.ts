import { Prisma } from '.prisma/client';
import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';

const StopwatchCreate: Command = {
    id: '00923569-fbc4-4ccf-a8ba-c625eaa5cbea',
    name: 'stopwatch create',
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name', true);
        const startOnCreate = interaction.options.getBoolean('start-on-create') || true;

        try {
            const res = await prisma.stopwatch.create({
                data: {
                    name,
                    serverId: interaction.guild?.id as string,
                    channelId: interaction.channel?.id as string,
                    userId: user.id
                }
            });

            if (startOnCreate) {
                await prisma.stopwatch.update({
                    where: {
                        id: res.id
                    },
                    data: {
                        startedAt: new Date()
                    }
                });
            }

            return interaction.reply({
                embeds: [
                    {
                        title: `:stopwatch: Stopwatch has been created.`,
                        description: `To get the current progress of your stopwatch use \`/stopwatch info name: <name>\``,
                        fields: [
                            {
                                name: `name`,
                                value: name
                            }
                        ]
                    }
                ]
            });
        } catch (e) {
            if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
                throw e;
            } else {
                if (e.code === 'P2002') {
                    throw new BotError(`Cannot create stopwatch. One already exists with that name.`);
                }
                throw e;
            }
        }
    }
}

export default StopwatchCreate;