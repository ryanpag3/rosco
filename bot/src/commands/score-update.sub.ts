import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import * as ScoreService from '../service/score';

const ScoreUpdate: Command = {
    id: '85826091-2e7e-484c-94c3-7d5da87d1166',
    name: 'score update',
    description: 'Update a score.',
    examples: ``,
    // options are handled in score.ts since this is a subcommand
    options: {},
    handler: async (interaction, _user, server) => {
        const name = interaction.options.getString('name');
        const newName = interaction.options.getString('new-name');
        const description = interaction.options.getString('description');
        const amount = interaction.options.getInteger('amount');
        const color = interaction.options.getString('color');

        const score = await prisma.score.findUnique({
            where: {
                name_serverId: {
                    name: name as string,
                    serverId: server?.id as string
                }
            }
        });

        if (!score)
            throw new BotError(`Cannot find score with name **${name}**.`);

        // @ts-ignore
        const updateData = buildUpdateObject(newName, description, amount, color);

        // @ts-ignore
        await ScoreService.update(name, server?.id, updateData);

        const fields: {
            name: string;
            value: string;
        }[] = [];

        Object.keys(updateData).map((k: string) => {
            if (!updateData[k] || k === 'name')
                return;
            fields.push({
                name: k,
                value: updateData[k].toString()
            });
        });

        await interaction.reply({
            embeds: [
                {
                    title: `:compass: Score has been updated.`,
                    description: `**${newName || score.name}** has been updated with the following changes`,
                    fields: fields
                }
            ]
        });
    }

};

const buildUpdateObject = (name: string, description: string, amount: number, color: string) => {
    let obj: any = {};
    if (name)
        obj['name'] = name;
    
    if (description)
        obj['description'] = description;

    if (amount)
        obj['amount'] = amount;

    if (color)
        obj['color'] = color;

    return obj;
}

export default ScoreUpdate;