import axios from 'util/axios';

export const toggleModule = async (guildId: string, module: string, isEnabled: boolean) => {
    return axios.post(`/automod/${guildId}/${module}/toggle`, null, {
        params: {
            isEnabled
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


export const setBannedWords = async (guildId: string, words: string[]) => {
    return axios.post(`/automod/${guildId}/banned-words`, null, {
        params: {
            words: encodeURIComponent(words.join(','))
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getBannedWordsData = async (guildId: string) => {
    return axios.get(`/automod/${guildId}/banned-words`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getLinkDetectData = async (guildId: string) => {
    return axios.get(`/automod/${guildId}/link-detect`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}