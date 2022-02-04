import { Announcement, Timer } from '@prisma/client';
import { MessageEmbedOptions, TextChannel } from 'discord.js';
import { DateTime } from 'luxon';
import { redlock } from './redlock';
import { Lock } from 'redlock';
import logger from './logger';
import prisma from './prisma';
import client from '..';

const POLL_INTERVAL = process.env.SCHEDULED_TASK_POLL_INTERVAL || 5000;
let daemonId: any;
let activeTasks: any = {};

export const start = () => {
    logger.debug('starting scheduled task daemon');
    daemonId = setInterval(() => checkForScheduledTasks(), POLL_INTERVAL as number);
}

export const stop = () => {
    logger.debug('stopping scheduled task daemon');
    if(daemonId)
        clearInterval(daemonId);
}

export const checkForScheduledTasks = async () => {
    const fiveMinsFromNow = DateTime.now().plus({ minutes: 5 });

    const [
        timers,
        announcements
    ] = await prisma.$transaction([
        prisma.timer.findMany({
            where: {
                expiresOn: {
                    lt: fiveMinsFromNow.toJSDate(),
                    not: null
                },
                id: {
                    notIn: Object.keys(activeTasks)
                }
            }
        }),
        prisma.announcement.findMany({
            where: {
                announceAt: {
                    lt: fiveMinsFromNow.toJSDate()
                },
                id: {
                    notIn: Object.keys(activeTasks)
                }
            }
        })
    ]);

    const promises = [
        ...timers.map((t) => scheduleTimer(t)),
        ...announcements.map((a) => scheduleAnnouncement(a))
    ];

    return Promise.all(promises);
}

const scheduleTimer = async (timer: Timer) => {
    return scheduleTask(timer.expiresOn as Date, timer.id, timer.channelId, {
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
    }, async () => {
        await prisma.timer.delete({
            where: {
                id: timer.id
            }
        });
    })
}

const scheduleAnnouncement = async (announcement: Announcement) => {
    return scheduleTask(announcement.announceAt, announcement.id, announcement.channelId, {
        title: `:loudspeaker: Announcement!`,
        description: `name: **${announcement.name}**\n\nmessage: ${announcement.message}`
    }, async () => {
        await prisma.announcement.delete({
            where: {
                id: announcement.id
            }
        });
    });
}

const scheduleTask = async (at: Date, taskId: string, channelId: string, messageEmbed: MessageEmbedOptions, onCompleted: () => Promise<void>) => {
    const timeToAnnounce = DateTime.fromJSDate(at).diff(DateTime.now(), 'milliseconds');
    const milliseconds = timeToAnnounce.milliseconds < 0 ? 0 : timeToAnnounce.milliseconds;

    let lock: Lock;
    try {
        lock = await redlock.acquire([taskId], milliseconds + 5000);
    } catch (e) {
        // to stop the daemon from unnecessarily querying this
        activeTasks[taskId] = {};
        logger.trace(`Could not acquire a lock. Expected noop...`);
        return false;
    }

    const t = setTimeout(async () => {
        // TODO: send announcement

        const channel = (await client.channels.fetch(channelId)) as TextChannel;

        await channel.send({
            embeds: [ messageEmbed ]
        })

        await onCompleted();

        logger.debug(`${taskId} announced.`);
        delete activeTasks[taskId];
        await lock.release();
    }, milliseconds);

    activeTasks[taskId] = t;
    logger.debug(`${taskId} added to cache. Should be announced in ${milliseconds} milliseconds`);
    return true;
}