import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://paliwo-bc6a4.firebaseio.com/'
});

export default instance;