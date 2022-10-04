import { Command } from '../../../types/command';
// @ts-ignore
import isHexColor from 'is-hexcolor';
import { CacheType, CommandInteraction } from 'discord.js';
import turfwarPlotQueue from '../../mq/queue/turfwar-plot-queue';
import TurfwarPlotEvent from '../../mq/event/turfwar-plot-event';
import { getMaxGridSize } from '../../service/turfwar-grid-builder';

const TurfwarPlot: Command = {
    id: 'cd17a4c2-1fc5-4fc8-b009-8f7676fb2122',
    name: 'turfwar plot',
    handler: async (interaction, user, server) => {
        const coords = getCoords(interaction);
        const color = interaction.options.getString('color', true);

        validateCoordinates(coords.x, coords.y);
        
        const isHex = isHexColor(color);
        if (!isHex) {
            throw new Error(`${color} is not a valid hex-color. Please see https://www.color-hex.com/ for some examples.`);
        }

        const job: TurfwarPlotEvent = {
            userId: user.id,            
            coords,
            color,
            serverId: server.id
        };

        turfwarPlotQueue.add(job);

        return interaction.reply({
            embeds: [
                {
                    description: `turfwar plot queued`
                }
            ]
        })
    }
};

function getCoords(interaction: CommandInteraction<CacheType>) {
    try {
        const coords = interaction.options.getString('coords', true);
        const split = coords.split(',');

        if (isNaN(Number.parseInt(split[0])) || isNaN(Number.parseInt(split[1]))) {
            throw new Error(); // trigger common error
        }

        return {
            x: Number.parseInt(split[0]),
            y: Number.parseInt(split[1])
        }
    } catch (e) {
        throw new Error('Could not parse coords argument.');
    }

}

function validateCoordinates(x: number, y: number) {
    const maxSize = getMaxGridSize();

    if (x < 0 || y < 0)
        throw new Error(`Coordinate cannot be less than 0`);

    if (x > maxSize || y > maxSize)
        throw new Error(`X Coordinate cannot be larger than ${maxSize}`);
}

export default TurfwarPlot;