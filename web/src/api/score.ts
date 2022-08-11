import axios from 'util/axios';
import history from 'util/history';

export const list = async (
    guildId: string,
    take: number = 10,
    skip: number = 0,
    filter?: string,
    scoreboard?: string
) => {
    try {
    return await axios.get(`/guild/${guildId}/score`, {
        params: {
            take,
            skip,
            filter,
            scoreboard
        }
    });
} catch (e) {
    history.replace('/internal-error');
}
}

export const listByPage = async (
    guildId: string, 
    page: number = 1, 
    amount: number = 10, 
    filter?: string, 
    scoreboard?: string
) => {
    try {
   return await axios.get(`/guild/${guildId}/score`, {
       params: {
           page,
           amount,
           filter,
           scoreboard
       }
   });
} catch (e) {
    history.replace('/internal-error');
}
}

export const listAll = async (
    guildId: string,
    filter?: string,
    scoreboard?: string
) => {
    try {
    return await axios.get(`/guild/${guildId}/score/all`, {
        params: {
            filter,
            scoreboard
        }
    }); 
} catch (e) {
    history.replace('/internal-error');
}
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
    try {
    return await axios.patch(`/guild/${guildId}/score/${scoreId}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
} catch (e) {
    history.replace('/internal-error');
}
}

export const deleteScore = async (
    guildId: string,
    scoreId: string
) => {
    try {
    return await axios.delete(`/guild/${guildId}/score/${scoreId}`);
} catch (e) {
    history.replace('/internal-error');
}
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
    try {
    return await axios.post(`/guild/${guildId}/score`, data, {
        headers: {
            'Content-Type': 'application/json'
        } 
    });
} catch (e) {
    history.replace('/internal-error');
}
}