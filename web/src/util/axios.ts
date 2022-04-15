import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://api.roscobot.com',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': process.env.PUBLIC_URL
    }
});

export default axios;