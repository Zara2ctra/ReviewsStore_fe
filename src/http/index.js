import axios from "axios";

const $host = axios.create({
    baseURL: "https://reviews-storebe.onrender.com:10000/"
})

const $authHost = axios.create({
    baseURL: "https://reviews-storebe.onrender.com:10000/"
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}

