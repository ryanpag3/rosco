import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Command } from '../../types/command';
import LinkCache from '../service/link-cache';
import BotError from '../util/bot-error';
import prisma from '../util/prisma';
import PrismaErrorCode from '../util/prisma-error-code';

const LinkDetectAllow: Command = {
    id: 'e7e51c98-d48c-4bdc-9177-7120abe8b83c',
    name: 'link-detect allow',
    handler: async (interaction, user, server) => {
        const pattern = interaction.options.getString('pattern', true);
        
        try {
            const r = await prisma.allowedLink.create({
                data: {
                    serverId: server.id,
                    pattern
                }
            });

            await LinkCache.cacheRecord(r);
        } catch (e) {
            if ((e as PrismaClientKnownRequestError).code === PrismaErrorCode.UNIQUE_COHSTRAINT)
                throw new BotError('This pattern has already been added to the allow list.');
            throw e;
        }

        return interaction.reply({
            embeds: [
                {
                    title: `:white_check_mark: A new entry has been added to the link allow list.`,
                    description: 'The following pattern will be allowed to be posted when "link-detect" is enabled.',
                    fields: [
                        {
                            name: 'pattern',
                            value: pattern
                        }
                    ]
                }
            ]
        })
    }
};

export default LinkDetectAllow;