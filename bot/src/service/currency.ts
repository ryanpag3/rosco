import { CacheType, GuildMember, Interaction, Message } from 'discord.js'

export interface CurrencyRule {
    role: string;
    action: CurrencyAction;
    amount: number;
    filter?: string 
}


// keep in sync with prisma.schema
export enum CurrencyAction {
    COMMAND = 'COMMAND',
    MESSAGE = 'MESSAGE',
    REACTION = 'REACTION',
}

export const DefaultCurrencyRule: CurrencyRule[] = [
    {
        role: '@everyone',
        action: CurrencyAction.COMMAND,
        amount: 1
    },
    {
        role: '@everyone',
        action: CurrencyAction.MESSAGE,
        amount: 1 
    },
    {
        role: '@everyone',
        action: CurrencyAction.REACTION,
        amount: 1
    }
]

export const handleCurrencyEvent = async (action: CurrencyAction, member: GuildMember, payload: Interaction<CacheType>|Message) => {
    
}