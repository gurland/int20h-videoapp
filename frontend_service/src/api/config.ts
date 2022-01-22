import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: '',
    headers: { Authorization: localStorage.getItem('accessToken') || '' },
});
