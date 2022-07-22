import axios from 'util/axios';

export const list = async (
    guildId: string,
    take: number = 10,
    skip: number = 0,
    filter?: string,
    scoreboard?: string
) => {
    return axios.get(`/guild/${guildId}/score`, {
        params: {
            take,
            skip,
            filter,
            scoreboard
        }
    });
}

export const listByPage = async (
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

export const listAll = async (
    guildId: string,
    filter?: string,
    scoreboard?: string
) => {
    return axios.get(`/guild/${guildId}/score/all`, {
        params: {
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

export const deleteScore = async (
    guildId: string,
    scoreId: string
) => {
    return axios.delete(`/guild/${guildId}/score/${scoreId}`);
} 

export const createScore = async (
    guildId: string,
    data: {
        name: string;
        description?: string;
        color?: string;
        amount?: number;   
    }
) => {
    return axios.post(`/guild/${guildId}/score`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}