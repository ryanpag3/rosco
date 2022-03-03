import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../../../types/command';
import { validateModuleAndAction } from '../../../service/auto-mod';
import BotError from '../../../util/bot-error';
import prisma from '../../../util/prisma';
import PrismaErrorCode from '../../../util/prisma-error-code';



const RuleAdd: Command = {
    id: 'b5a6c7a4-d898-4cdf-9c10-c3bc901f9b30',
    name: 'rule add',
    handler: async (interaction, user, server) => {
        const module = interaction.options.getString('module', true);
        const action = interaction.options.getString('action', true);
        const duration = interaction.options.getInteger('duration', true);
        const violations = interaction.options.getInteger('violations', true);
        const cooldown = interaction.options.getInteger('cooldown', true);

        validateModuleAndAction(module, action);

        try {
            await prisma.autoModRule.create({
                data: {
                    serverId: server.id,
                    module,
                    action,
                    duration,
                    violations,
                    cooldownPeriodSecs: cooldown
                }
            });
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT)
                throw new BotError(`A rule has already been defined for **${module}** with action **${action}**. Please delete before defining a new one.`);
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:straight_ruler: An AutoMod rule has been defined.`,
                    description: `If a user triggers the **${module}** module **${violations}** times within **${cooldown}** seconds, the following action will be take: **${action}**.`,
                    fields: [
                        {
                            name: 'module',
                            value: module
                        },
                        {
                            name: 'action',
                            value: action
                        },
                        {
                            name: 'duration',
                            value: duration.toString()
                        },
                        {
                            name: 'violations',
                            value: violations.toString()
                        },
                        {
                            name: 'cooldown',
                            value: cooldown.toString()
                        }
                    ]

                }
            ]
        });
    }
};

export default RuleAdd;