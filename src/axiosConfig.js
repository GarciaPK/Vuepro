
import axios from 'axios';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('tokenDeAcceso');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
