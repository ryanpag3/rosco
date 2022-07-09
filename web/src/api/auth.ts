import axios from 'util/axios'

export const logout = async () => {
    return axios.get('/logout');
}