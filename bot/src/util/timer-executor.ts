import { Timer } from '@prisma/client';
import { DateTime, Duration } from 'luxon';
import logger from './logger';
import prisma from './prisma';

const CHECK_INTERVAL = process.env.TIMER_CHECK_INTERVAL_MS || 3000;

let daemonId: any;

let activeTimers: any = {};

/**
 * Start the daemon to begin checking for soon-to-finish timers in the database.
 */
export const startDaemon = () => {
    logger.debug('starting timer daemon');
    daemonId = setInterval(() => checkForTimers(), CHECK_INTERVAL as number);
}

export const stopDaemon = () => {
    if (daemonId)
        clearInterval(daemonId);
    logger.debug('stopped timer daemon');
}

export const checkForTimers = async () => {
    const inFiveMins = DateTime.now().plus({ minutes: 5 });

    const timersToBeAdded = await prisma.timer.findMany({
        where: {
            OR: [
                {
                    expiresOn: {
                        gte: DateTime.now().toJSDate(),
                        lte: inFiveMins.toJSDate()
                    }
                },
                {
                    announcementSent: false
                }
            ],
            id: {
                notIn: Object.keys(activeTimers)
            }
        }
    });

    logger.debug(`${timersToBeAdded.length} timers to be added to cache`);

    timersToBeAdded.forEach((t) => addTimerToCache(t));
}

const addTimerToCache = (timer: Timer) => {
    const timeToAnnounce = DateTime.fromJSDate(timer.expiresOn).diff(DateTime.now(), 'milliseconds');
    const milliseconds = timeToAnnounce.milliseconds < 0 ? 0 : timeToAnnounce.milliseconds;

    logger.debug(`${timer.id} should be announced in ${milliseconds} milliseconds`);

    // TODO: establish lock

    const t = setTimeout(async () => {
        // TODO: send announcement

        await prisma.timer.update({
            where: {
                id: timer.id
            },
            data: {
                announcementSent: true
            }
        });
        
        logger.debug(`${timer.id} announced.`);
        
        delete activeTimers[timer.id];
        // TODO: release lock
    }, milliseconds);

    activeTimers[timer.id] = t;

    logger.debug(`${timer.id} added to cache.`);
}