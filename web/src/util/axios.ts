import Axios from 'axios';
import { NavigateFunction, NavigateOptions } from 'react-router-dom';
import history from './history';
import LocalStorageKey from './localstorage-key';

const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://api.roscobot.com',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': process.env.PUBLIC_URL
    }
});

axios.interceptors.response.use(
    /**
     * Any status code that lies within the range of 2xx causes this function to fire.
     */
    function(response) {
        return response;
    },
    /**
     * Any status code that falls outside of the 2xx range causes this function to trigger.
     */
    function(error) {
        if (error.response.status === 401) {
            localStorage.unset(LocalStorageKey.SELECTED_SERVER);
            alert('An authentication error has occured. Navigating back to landing screen.');
            history.replace('/');
        }

        throw error;
    });


export default axios;