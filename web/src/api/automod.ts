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

export const setLinkDetect = async (guildId: string, links: string[]) => {
    return axios.post(`/automod/${guildId}/link-detect`, links, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getCapslockSpamConfig = async (guildId: string) => {
    return axios.get(`/automod/${guildId}/capslock-detect`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const setCapslockSpamLength = async (guildId: string, length: number) => {
    return axios.post(`/automod/${guildId}/capslock-detect/length`, null, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            length
        }
    })
}