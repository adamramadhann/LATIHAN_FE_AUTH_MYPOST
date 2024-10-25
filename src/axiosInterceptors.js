import axios from "axios";
import genereteToken from "./token/GenereteToken";

const api = axios.create({
    baseURL : import.meta.env.API_URL_POST
})

api.interceptors.request.use(
    (succes) => {
        const token = genereteToken()
        if (token) {
            succes.headers.Authorization = `Bearer ${token}`
        }
        return succes
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api