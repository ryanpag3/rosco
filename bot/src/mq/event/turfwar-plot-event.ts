interface TurfwarPlotEvent {
    userId: string;
    coords: {
        x: number;
        y: number;
    };
    color: string;
}

export default TurfwarPlotEvent;