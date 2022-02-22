import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import { validateModuleAndAction } from '../service/auto-mod';
import BannedWordCache from '../service/banned-word-cache';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const AutoModRuleRemove: Command = {
    id: '84b9c354-bc13-4366-b69c-bbfca01c05cd',
    name: 'rule remove',
    handler: async (interaction, user, server) => {
        const module = interaction.options.getString('module', true);
        const action = interaction.options.getString('action', true);

        validateModuleAndAction(module, action);

        try {
            await prisma.autoModRule.delete({
                where: {
                    serverId_module_action: {
                        serverId: server.id,
                        action,
                        module
                    }
                }
            });
        } catch (e) {
            // noop
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:put_litter_in_its_place: An AutoMod rule has been deleted.`,
                    description: `The bot will no longer perform a **${action}** when the **${module}** module is broken.`
                }
            ]
        });
    }
};

export default AutoModRuleRemove;