import axios from 'util/axios';

export const list = async (
    guildId: string, 
    page: number = 1, 
    amount: number = 10, 
    filter?: string, 
    scoreboard?: string
) => {
   return axios.get(`/guild/${guildId}/score`, {
       params: {
           page,
           amount,
           filter,
           scoreboard
       }
   });
}

export const updateScore = async (
    guildId: string,
    scoreId: string,
    data: {
        name?: string;
        description?: string;
        color?: string;
        amount?: number;   
    }
) => {
    return axios.patch(`/guild/${guildId}/score/${scoreId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}