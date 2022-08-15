import axios from 'util/axios'
import history from 'util/history';

export const getMe = async (): Promise<{
    username: string;
}|undefined> => {
    try {
        const { data } = await axios.get(`/me`);
        return data;
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const getMyServers = async (): Promise<any> => {
    try {
        const { data } = await axios.get(`/me/guilds`, {
            params: {
                canManage: true
            }
        });
        return data;
    } catch (e) {
        history.replace('/internal-error');
    }
}