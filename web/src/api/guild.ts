import axios from 'util/axios';
import history from 'util/history';

export const getGuild = async (id: string) => {
    const { data } = await axios.get(`/guild/${id}`);
    return data;
}

export const updateTimezone = async (id: string, timezone: string) => {
    try {
        return await axios.post(`/guild/${id}/timezone`, null, {
            params: {
                timezone
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const getPermissions = async (id: string) => {
    try {
        const { data } = await axios.get(`/guild/${id}/permissions`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return data;
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const setPermissions = async (guildId: string, roles: any[], commands: any[]) => {
    try {
        return await axios.post(`/guild/${guildId}/permission`, {
            roles,
            commands
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const getRoles = async (id: string) => {
    try {
        const { data } = await axios.get(`/guild/${id}/roles`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return data;
    } catch (e) {
        history.replace('/internal-error');
    }
}