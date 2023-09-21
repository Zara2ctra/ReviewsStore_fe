import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name) => {
    const {data} = await $host.post('api/user/registration', {email, password, name})
    localStorage.setItem('token', data.token)
    return [jwt_decode(data.token), data.role]
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return [jwt_decode(data.token), data.role]
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return [jwt_decode(data.token), data.role]
    } catch (e) {
        console.log(e)
    }
}

export const getAllUsers = async () => {
    const {data} = await $host.get('api/user/')
    return data
}

export const getOneUser = async (userId) => {
    const {data} = await $host.get('api/user/' + userId)
    return data
}

export const removeUser = async (id) => {
    await $host.post('api/user/' + id)
}
