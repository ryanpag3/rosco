import axios from 'util/axios';

export const toggleBannedWords = async (guildId: string, isEnabled: boolean) => {
    return axios.post(`/automod/${guildId}/banned-words/toggle`, null, {
        params: {
            isEnabled
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
}