import { Guild } from 'discord.js';
import prisma from '../util/prisma'
import { DefaultCurrencyRule } from './currency';

export const initializeServer = async (guild: Guild|null) => {
    if (!guild)
        return;
        
    return prisma.server.upsert({
        where: {
            discordId: guild?.id
        },
        update: {
            
        },
        create: {
            discordId: guild?.id,
            CurrencyRule: {
                create: DefaultCurrencyRule.map(rule => {
                    const role = guild.roles.cache.find(r => r.name === rule.role);
                    return {
                        roleId: role?.id as string,
                        action: rule.action as any,
                        amount: rule.amount
                    }
                })
            }
        },
        include: {
            CurrencyRule: true
        }
    });
}