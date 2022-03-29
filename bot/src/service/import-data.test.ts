import onInteractionCreate from '../event/interaction-create';
import logger from '../util/logger';
import prisma from '../util/prisma';
import { createTestInteraction, generateScoreBotData } from '../util/test-helper';
import { importDataFromScoreBot } from './import-data';

it('should import data from score bot', async () => {
    const int = createTestInteraction('ping');

    const r = await onInteractionCreate(int);

    const data = generateScoreBotData(12, 13, 14);

    await importDataFromScoreBot(int.channelId, r.user, r.server, data);

    const scores = await prisma.score.findMany({});
    expect(scores.length).toBe(12);

    const scoreboards = await prisma.scoreboard.findMany({});
    expect(scoreboards.length).toBe(13);

    const keywords = await prisma.keyword.findMany();
    expect(keywords.length).toBe(14);

}, 10000);