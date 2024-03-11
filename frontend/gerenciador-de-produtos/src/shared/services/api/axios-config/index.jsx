import axios from 'axios'
import { Enviroment } from '../../../environment'

const Api = axios.create({
    baseURL: Enviroment.URL_BASE,
})

Api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('APP_ACESS_TOKEN'))

    if(token) {
        config.headers.Authorization = `${token}`;
    }

    return config
}, (error) => {
    return Promise.reject(error);
})

export { Api };