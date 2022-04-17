import axios from 'util/axios';

export const getGuild = async (id: string) => {
    const { data } = await axios.get(`/guild/${id}`, {
        validateStatus: (status) => status === 200
    });
    return data;
}

export const updateTimezone = async (id: string, timezone: string) => {
    return axios.post(`/guild/${id}/timezone`, null, {
        params: {
            timezone
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
}