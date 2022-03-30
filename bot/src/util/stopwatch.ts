import { Stopwatch } from '@prisma/client';
import { DateTime, Interval } from 'luxon';

export const getDuration = (stopwatch: Stopwatch, includeExample: boolean = true) => {
    return `${!stopwatch.startedAt && !stopwatch.stoppedAt ? 
                '00:00:00' : Interval.fromDateTimes(DateTime.fromJSDate(stopwatch.startedAt as Date), 
            stopwatch.stoppedAt ? 
                DateTime.fromJSDate(stopwatch.stoppedAt) : DateTime.now()).toDuration().toFormat('hh:mm:ss')}` +
            `${includeExample ? `(hh:mm:ss)` : ``}`
};