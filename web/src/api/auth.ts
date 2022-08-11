import axios from 'util/axios'
import history from 'util/history';

export const logout = async () => {
    try {
        return await axios.get('/logout');
    } catch (e) {
        history.replace('/');
    }
}