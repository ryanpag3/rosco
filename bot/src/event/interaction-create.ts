import { ButtonInteraction, CommandInteraction } from 'discord.js';
import COMMANDS from '../commands';
import BotError from '../util/bot-error';
import logger from '../util/logger';
import * as ServerService from '../service/server';
import * as CommandHistory from '../util/command-history';
import { userHasPermission } from '../service/permission';
import * as UserService from '../service/user';
import { CurrencyAction, handleCurrencyEvent } from '../service/currency';
import { Server, User } from '@prisma/client';
import prisma from '../util/prisma';
import Poll from '../commands/poll';
import { idText } from 'typescript';

const onInteractionCreate = async (interaction: CommandInteraction) => {
    try {
        if (!interaction.isButton() && !interaction.isCommand() )
            return;
    
        const server = await ServerService.initializeServer(interaction.guild);

        const user = await UserService.initUser(interaction.member as any, server as Server); 

        if (interaction.isButton())
            return onButtonPressed(interaction, user, server as Server);

        if (!await userHasPermission(interaction, user)) {
            return interaction.reply({
                embeds: [
                    {
                        title: `:lock: Permission denied.`,
                        description: `You do not have permission to run that command.`
                    }
                ]
            })
        }

        await handleCurrencyEvent(CurrencyAction.COMMAND, interaction);

        await CommandHistory.addToHistory(user.id, interaction, JSON.stringify(interaction.toJSON(), (key, value) => typeof value === 'bigint' ? value.toString() : value, 4));

        const { handler } = COMMANDS[interaction.commandName];

        if (!handler) {
            return interaction.reply('command not found.');
        }

        await handler(interaction, user, server);
    } catch (e) {
        logger.error(`An error occured while receiving interaction.`, e);

        const extraInfo = `\n\n_Need help?_\n - Run \`/help ${interaction.commandName}\` \n - [Join the support server](https://discord.gg/KwJUfbt5Wv)`;

        if (!(e instanceof BotError)) {
            interaction.reply({
                embeds: [
                    {
                        description: `An internal server error occured. Please contact bot administrator.${extraInfo}`
                    }
                ]
            });
        } else {
            interaction.reply({
                embeds: [
                    {
                        title: `:cry: Whoops, an error occured.`,
                        description: `${e.message}${extraInfo}`
                    }
                ]
            });
        }

        if (process.env.NODE_ENV === 'test')
            throw e;
    }

}

const onButtonPressed = async (interaction: ButtonInteraction, user: User, server: Server) => {
    // @ts-ignore
    const command = interaction.message.interaction?.commandName;

    switch(command) {
        case 'poll':
            return onPollButtonPressed(interaction, user, server);
    }
}

const onPollButtonPressed = async (interaction: ButtonInteraction, user: User, server: Server) => {
    // TODO: handle case if poll doesnt exist
    // TODO: handle case if poll has been closed
    // TODO: handle case of if poll option already exists
    // TODO: handle case of poll option already exists, but a change is happening

    try {
        const pollOption = await prisma.pollOption.findUnique({
            where: {
                id: interaction.customId
            }
        });
    
        await prisma.pollVote.create({
            data: {
                pollId: pollOption?.pollId as string,
                pollOptionId: pollOption?.id as string,
                userId: user.id
            }
        });
        
        interaction.update({
            embeds: [{
                title: interaction.message.embeds[0].title as string,
                description: await createPollOptionsUpdate(pollOption?.pollId as string)
            }]
        })
    
        interaction.reply({
            embeds: [{
                title: ':ballot_box_with_check: Your vote has been submitted.' 
            }],
            ephemeral: true
        });
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

const createPollOptionsUpdate = async (pollId: string) => {
    const poll = await prisma.poll.findUnique({
        where: {
            id: pollId
        },
        include: {
            PollOption: {
                include: {
                    _count: {
                        select: {
                            Votes: true
                        }
                    }
                }
            }
        }
    });

    return poll?.PollOption.map(po => `_${po._count.Votes}_ | **${po.content}**`).join('\n')
}

export default onInteractionCreate;