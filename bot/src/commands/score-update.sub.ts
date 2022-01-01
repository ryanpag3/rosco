import { Command } from '../../types/command';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import prisma from '../util/prisma';
import ScoreType from '../util/score-type';

const ScoreUpdate: Command = {
    name: 'update',
    description: 'Update a score.',
    examples: ``,
    // options are handled in score.ts since this is a subcommand
    options: {},
    handler: async (interaction, user) => {
        const name = interaction.options.getString('name');
        const newName = interaction.options.getString('new-name');
        const description = interaction.options.getString('description');
        const type = interaction.options.getString('type');
        const amount = interaction.options.getInteger('amount');

        const score = await prisma.score.findUnique({
            where: {
                // @ts-ignore
                name
            }
        });

        if (!score)
            throw new BotError(`Cannot find score with name **${name}**.`);

        // @ts-ignore
        const updateData = buildUpdateObject(newName, description, type, amount);

        await prisma.score.update({
            where: {
                // @ts-ignore
                name: name
            },
            // @ts-ignore
            data: updateData
        });

        const fields: {
            name: string;
            value: string;
        }[] = [];

        fields.push({
            name: 'name',
            value: newName || score.name
        });

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
                    title: `:up: Your score [**${name}**] has been updated.`,
                    fields: fields
                }
            ]
        });
    }

};

const buildUpdateObject = (name: string, description: string, type: string, amount: number) => {
    let obj: any = {};
    if (name)
        obj['name'] = name;
    
    if (description)
        obj['description'] = description;
    
    if (type)
        obj['type'] = type;

    if (amount)
        obj['amount'] = amount;

    return obj;
}

export default ScoreUpdate;