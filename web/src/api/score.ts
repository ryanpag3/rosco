import axios from 'util/axios';

export const list = async (
    guildId: string, 
    page: number = 1, 
    amount: number = 10, 
    filter?: string, 
    scoreboard?: string
) => {
   return axios.get(`/score/${guildId}`, {
       params: {
           page,
           amount,
           filter,
           scoreboard
       }
   });
}