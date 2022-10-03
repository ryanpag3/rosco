import Queue from '../queue';

const turfwarPlotQueue = new Queue('turfwar-plot-queue');

turfwarPlotQueue.process(async (job) => {
    
});

export default turfwarPlotQueue;