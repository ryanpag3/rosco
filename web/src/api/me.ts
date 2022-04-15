import axios from 'util/axios'

export const getMe = async (): Promise<{
    username: string;
}> => {
    const { data } = await axios.get(`/me`);
    return data;
}

export const getMyServers = async (): Promise<any> => {
    const { data } = await axios.get(`/me/guilds`, {
        params: {
            canManage: true
        }
    });
    return data;
}