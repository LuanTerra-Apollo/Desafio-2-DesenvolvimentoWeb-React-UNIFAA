import axios from 'axios'
import { Enviroment } from '../../../environment'

const Api = axios.create({
    baseURL: Enviroment.URL_BASE,
})

Api.interceptors.request.use((config) => {
    const tokenString = localStorage.getItem('APP_ACCESS_TOKEN')

    if(tokenString) {

        const token = JSON.parse(tokenString);

        config.headers.Authorization = `${token}`;
    }

    return config
}, (error) => {
    return Promise.reject(error);
})

export { Api };