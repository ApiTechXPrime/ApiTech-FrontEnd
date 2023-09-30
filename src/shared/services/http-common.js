import axios from 'axios';

export default axios.create({
    baseURL: 'https://my-json-server.typicode.com/ApiTechXPrime/dataApiTech',
    headers: {"Content-Type": 'application/json'}
});