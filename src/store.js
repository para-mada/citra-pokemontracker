import axios from 'axios'

let HOST_URL;
const DEV = true;
if (DEV) {
    HOST_URL = 'http://localhost:8000';
} else {
    HOST_URL = 'https://pokemon.para-mada.com';
}
export const session = axios.create({
    baseURL: HOST_URL
})