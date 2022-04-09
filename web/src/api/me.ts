import axios from 'util/axios'

export const getMe = async (): Promise<{
    username: string;
}> => {
    const { data } = await axios.get(`/me`);
    return data;
}