import axios from 'util/axios';

export const getGuild = async (id: string) => {
    const { data } = await axios.get(`/guild/${id}`, {
        validateStatus: (status) => status === 200
    });
    return data;
}