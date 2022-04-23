import axios from 'util/axios';

export const getGuild = async (id: string) => {
    const { data } = await axios.get(`/guild/${id}`);
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

export const getPermissions = async (id: string) => {
    const { data } = await axios.get(`/guild/${id}/permissions`, {
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    return data;
}

export const setPermissions = async (guildId: string, roles: any[], commands: any[]) => {
    return axios.post(`/guild/${guildId}/permission`, {
        roles,
        commands
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getRoles = async (id: string) => {
    const { data } = await axios.get(`/guild/${id}/roles`, {
        headers: {
            'Content-Type': 'application/json' 
        }
    });

    console.log(data);

    return data; 
}