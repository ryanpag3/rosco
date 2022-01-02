import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { MessageAttachment, MessageEmbed } from 'discord.js';
import { Command } from '../../types/command';

const ScoreList: Command = {
    name: 'list',
    description: 'List out current scores.',
    examples: ``,
    // this is manages in score.ts because it is a subcommand
    options: {},
    handler: async (interaction, user) => {
        const height = 400;
        const width = 1000;
        const backgroundColor = '#dbdbdb';
        const chartJsNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: backgroundColor });
        const stream = chartJsNodeCanvas.renderToStream({
            type: 'bar',
            data: {
                labels: ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
                datasets: [
                    {
                        data: [1, 2, 3, 4, 5, 6],
                        backgroundColor: ['blue', 'green', 'orange', 'yellow', 'white', 'black'],
                        borderWidth: 1,
                        yAxisID: 'yAxis'
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                layout: {
                    padding: 25
                },
                scales: {
                    yAxis: {
                        axis: 'y',
                        ticks: {
                            color: '#333333',
                            font: {
                                family: 'Roboto',
                                size: 18,
                                // weight: 'bold'
                            }
                        }
                    },
                    xAxis: {
                        ticks: {
                            color: '#949494',
                            font: {
                                family: 'Roboto',
                                size: 16,
                                weight: 'bold'
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Scores',
                        font: {
                            family: 'Roboto',
                            size: 24
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            },
        });
        const attachment = new MessageAttachment(stream);
        await interaction.reply({
            embeds: [
                {
                    title: 'testing'
                }
            ],
            files: [ attachment ]
        });
    }
};

export default ScoreList;