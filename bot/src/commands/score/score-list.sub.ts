import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { MessageAttachment } from 'discord.js';
import { Command } from '../../../types/command';
import * as ScoreService from '../../service/score';
import BotError from '../../util/bot-error';
import prisma from '../../util/prisma';

const ScoreList: Command = {
    id: '502ab15e-a961-497a-a5be-282ebcda4c5a',
    name: 'score list',
    description: 'List out current scores.',
    examples: ``,
    // this is manages in score.ts because it is a subcommand
    options: {},
    handler: async (interaction, user, server) => {
        let amount = interaction.options.getInteger('amount') || server.scoreListAmount;
        const page = interaction.options.getInteger('page') || 1;
        const filter = interaction.options.getString('filter');
        const includeRaw = interaction.options.getBoolean('include-raw') || false;
        const scoreboardName = interaction.options.getString('scoreboard') || undefined;
        const defaultAmount = interaction.options.getInteger('default-amount');
        const maxAmount = 20;

        if (amount > maxAmount) {
            throw new BotError(`The maximum number of scores per page is 20.`);
        }

        if ((defaultAmount !== null && defaultAmount > maxAmount) || amount > maxAmount) {
            throw new BotError(`The maximum number of scores per page is 20.`);
        }

        if (defaultAmount !== null && defaultAmount !== amount) {
            await prisma.server.update({
                where: {
                    id: server.id
                },
                data: {
                    scoreListAmount: defaultAmount
                }
            });
            amount = defaultAmount;
            return interaction.reply({
                embeds: [
                    {
                        title: `Default amount updated.`,
                        description: `This server's default amount when listing scores is now ${amount}.`
                    }
                ]
            });
        }

        const { scores } = await ScoreService.listByPage(server, page, amount, filter, scoreboardName)
        
        const height = 35 * scores.length + 125;
        const width = 1000;
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
                                size: 18
                            }
                        }
                    },
                    xAxis: {
                        ticks: {
                            color: '#949494',
                            maxTicksLimit: 20,
                            font: {
                                family: 'Roboto',
                                size: 16,
                                weight: 'bold'
                            },
                            callback: (value) => {
                                return commarize(value as number, 1000);
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: scoreboardName || 'Scores',
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
                    description: `Get details on a particular score with \`/score info <name>\`\n\n${includeRaw ? scores.map((s) => `${s.amount} - ${s.name}`).join('\n') : ''}`
                }
            ],
            files: [attachment]
        });
    }
};

function truncateWithEllipses(text: string, max: number) {
    return text.substr(0, max - 1) + (text.length > max ? '...' : '');
}

function commarize(num: number, min?: number) {
    min = min || 1e3;
    // Alter numbers larger than 1k
    if (num >= min) {
        var units = ["k", "M", "B", "T"];

        var order = Math.floor(Math.log(num) / Math.log(1000));

        var unitname = units[(order - 1)];
        var num = Math.floor(num / 1000 ** order);

        // output number remainder + unitname
        return num + unitname
    }

    // return formatted original number
    return num.toLocaleString()
}


export default ScoreList;