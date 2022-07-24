import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../types/command';
import BotError from '../../util/bot-error';
import logger from '../../util/logger';
import prisma from '../../util/prisma';
import PrismaErrorCode from '../../util/prisma-error-code';

const ScoreboardScoreAdd: Command = {
    id: '87fa9d22-90fc-4b29-8638-df711ad8c5bb',
    name: 'scoreboard add-score',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name') as string;
        const scoreNames = interaction.options.getString('score-name', true)
                                .split(',').map(name => name.trim());

        try {
            const scoreboard = await prisma.scoreboard.findUnique({
                where: {
                    name_serverId: {
                        name,
                        serverId: server.id as string
                    }
                },
                rejectOnNotFound: false
            });

            if (!scoreboard)
                throw new BotError(`Could not find a scoreboard with the name **${name}**`);
            
            for (const scoreName of scoreNames) {
                await addScoreToScoreboard(server.id, scoreboard.id, scoreName);
            }

            return interaction.reply({
                embeds: [{
                    title: `:hearts: The following scores have been added to the scoreboard: ${name}`,
                    description: `${scoreNames.join(', ')}`
                }]
            });
        } catch(e) {
            throw e;
        }
    }
};

const addScoreToScoreboard = async (serverId: string, scoreboardId: string, scoreName: string) => {
    try {
        const score = await prisma.score.findUnique({
            where: {
                name_serverId: {
                    name: scoreName,
                    serverId
                }
            },
            rejectOnNotFound: false
        });

        if (!score)
            throw new BotError(`Could not find the score **${scoreName}** to add to the scoreboard.`);

        await prisma.scoreboardScore.create({
            data: {
                scoreId: score.id,
                scoreboardId

            }
        });
    } catch(e) {
        if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_CONSTRAINT)
            throw new BotError(`The score **${scoreName}** has already been added to that scoreboard.`);
            
        throw e;
    }
}

export default ScoreboardScoreAdd;