import axios from 'util/axios';
import history from 'util/history';

export const toggleModule = async (guildId: string, module: string, isEnabled: boolean) => {
    try {
        return await axios.post(`/automod/${guildId}/${module}/toggle`, null, {
            params: {
                isEnabled
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}


export const setBannedWords = async (guildId: string, words: string[]) => {
    try {
        return await axios.post(`/automod/${guildId}/banned-words`, null, {
            params: {
                words: encodeURIComponent(words.join(','))
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const getBannedWordsData = async (guildId: string) => {
    try {
        return await axios.get(`/automod/${guildId}/banned-words`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const getLinkDetectData = async (guildId: string) => {
    try {
        return await axios.get(`/automod/${guildId}/link-detect`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const setLinkDetect = async (guildId: string, links: string[]) => {
    try {
        return await axios.post(`/automod/${guildId}/link-detect`, links, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const getCapslockSpamConfig = async (guildId: string) => {
    try {
        return await axios.get(`/automod/${guildId}/capslock-detect`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e) {
        history.replace('/internal-error');
    }
}

export const setCapslockSpamLength = async (guildId: string, length: number) => {
    try {
        return await axios.post(`/automod/${guildId}/capslock-detect/length`, null, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                length
            }
        })
    } catch (e) {
        history.replace('/internal-error');
    }
}