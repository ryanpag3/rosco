import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://api.roscobot.com',
    withCredentials: true
});

export default axios;