import axios from 'axios';

export default axios.create({
    baseURL: 'https://apitechxprime.zeabur.app/api/v1',
    headers: {"Content-Type": 'application/json'}
});