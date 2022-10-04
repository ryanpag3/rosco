interface TurfwarPlotEvent {
    userId: string;
    coords: {
        x: number;
        y: number;
    };
    color: string;
    serverId: string;
}

export default TurfwarPlotEvent;