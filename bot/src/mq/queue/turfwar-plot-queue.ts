import logger from '../../util/logger';
import prisma from '../../util/prisma';
import TurfwarPlotEvent from '../event/turfwar-plot-event';
import Queue from '../queue';

const turfwarPlotQueue = new Queue('turfwar-plot-queue');

turfwarPlotQueue.process(async (job) => {
    const { data }: { data: TurfwarPlotEvent } = job;

   await prisma.turfwarPlot.upsert({
        where: {
            x_y: {
                x: data.coords.x,
                y: data.coords.y
            }
        },
        create: {
            x: data.coords.x,
            y: data.coords.y,
            createdById: data.userId,
            serverId: data.serverId,
            color: data.color
        },
        update: {
            createdById: data.userId,
            serverId: data.serverId,
            color: data.color
        }
    });

    logger.debug(`Assigned square ${data.userId} ${data.coords.x} ${data.coords.y}`);
});

export default turfwarPlotQueue;