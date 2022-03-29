import { Command } from '../../../../types/command';
import { validateModuleAndAction } from '../../../service/auto-mod';
import prisma from '../../../util/prisma';

const RuleList: Command = {
    id: 'b5a9c0a6-ffc5-41c9-bbbb-0a7456843c9a',
    name: 'rule list',
    handler: async (interaction, user, server) => {
        const module = interaction.options.getString('module', true);

        validateModuleAndAction(module, 'delete');

        const rules = await prisma.autoModRule.findMany({
            where: {
                serverId: server.id,
                module
            }
        });

        return interaction.reply({
            embeds: [
                {
                    title: `:straight_ruler: AutoMod rules found for module: ${module}`,
                    description: '',
                    fields: [
                        ...rules.map((r) => {
                            return {
                                name: `**${r.action}**`,
                                value: `...on _${r.violations}_ violations within _${r.cooldownPeriodSecs}_ seconds.`
                            }
                        })
                    ]
                }
            ]
        })
    }
};

export default RuleList;