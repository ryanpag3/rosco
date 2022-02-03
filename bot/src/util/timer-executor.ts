import { Timer } from '@prisma/client';
import { TextChannel } from 'discord.js';
import { DateTime, Duration } from 'luxon';
import { Lock } from 'redlock';
import client from '..';
import logger from './logger';
import prisma from './prisma';
import { redlock } from './redlock';

const CHECK_INTERVAL = process.env.TIMER_CHECK_INTERVAL_MS || 5000;

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
            expiresOn: {
                lt: inFiveMins.toJSDate()
            },
            id: {
                notIn: Object.keys(activeTimers)
            }
        }
    });

    const results = (await Promise
        .all(timersToBeAdded.map((t) => addTimerToCache(t))))
        .filter((r) => r === true);

    if (results.length !== 0)
        logger.debug(`${results.length} timers added to executor cache.`); 
}

const addTimerToCache = async (timer: Timer) => {
    const timeToAnnounce = DateTime.fromJSDate(timer.expiresOn).diff(DateTime.now(), 'milliseconds');
    const milliseconds = timeToAnnounce.milliseconds < 0 ? 0 : timeToAnnounce.milliseconds;

    let lock: Lock;
    try {
        lock = await redlock.acquire([timer.id], milliseconds + 5000);
    } catch (e) {
        // to stop the daemon from unnecessarily querying this
        activeTimers[timer.id] = {};
        logger.trace(`Could not acquire a lock. Expected noop...`);
        return false;
    }

    const t = setTimeout(async () => {
        // TODO: send announcement

        const channel = (await client.channels.fetch(timer.channelId)) as TextChannel;

        await channel.send({
            embeds: [
                {
                    title: ':hourglass_flowing_sand: Timer has completed!',
                    fields: [
                        {
                            name: 'name',
                            value: timer.name
                        },
                        {
                            name: 'message',
                            value: timer.message || 'Timer completed.'
                        }
                    ]
                }
            ]
        })

        await prisma.timer.delete({
            where: {
                id: timer.id
            }
        });

        logger.debug(`${timer.id} announced.`);
        delete activeTimers[timer.id];
        await lock.release();
    }, milliseconds);

    activeTimers[timer.id] = t;
    logger.debug(`${timer.id} added to cache. Should be announced in ${milliseconds} milliseconds`);
    
    return true;
}

export const buildTimestamp = (duration: Duration) => {
    return duration.toFormat('dd:hh:mm:ss');
};