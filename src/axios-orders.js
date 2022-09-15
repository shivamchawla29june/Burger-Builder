import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-aba71-default-rtdb.firebaseio.com/'
});

export default instance;