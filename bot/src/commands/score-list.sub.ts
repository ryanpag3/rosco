import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { MessageAttachment, MessageEmbed } from 'discord.js';
import { Command } from '../../types/command';
import prisma from '../util/prisma';

const ScoreList: Command = {
    name: 'list',
    description: 'List out current scores.',
    examples: ``,
    // this is manages in score.ts because it is a subcommand
    options: {},
    handler: async (interaction, user) => {
        const amount = interaction.options.getInteger('amount') || 10;
        const page = interaction.options.getInteger('page') || 1;

        const scores = await prisma.score.findMany({
            where: {
                serverId: interaction.guild?.id
            },
            take: amount,
            skip: amount * (page-1),
            orderBy: {
                amount: 'desc'
            }
        });

        const height = 75 * scores.length;
        const width = 1200;
        const backgroundColor = '#dbdbdb';
        const chartJsNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: backgroundColor });
        const stream = chartJsNodeCanvas.renderToStream({
            type: 'bar',
            data: {
                labels: scores.map(s => `${truncateWithEllipses(s.name, 15)} | ${s.amount}`),
                datasets: [
                    {
                        data: scores.map(s => s.amount),
                        backgroundColor: scores.map(s => s.color),
                        borderWidth: 1,
                        minBarLength: 5,
                        barPercentage: 1,
                        yAxisID: 'yAxis'
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                layout: {
                    padding: 15
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
                    description: `Get details on a particular score with \`/score details <name>\``
                }
            ],
            files: [ attachment ]
        });
    }
};

function truncateWithEllipses(text: string, max: number) 
{
    return text.substr(0,max-1)+(text.length>max?'...':''); 
}

export default ScoreList;