import axios from 'util/axios'
import history from 'util/history';

export const getGrid = async () => {
    try {
        return await axios.get('/turf-war');
    } catch (e) {
        history.replace('/internal-error');
    }
}