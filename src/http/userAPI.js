import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name) => {
    try {
        const {data} = await $host.post('api/user/registration', {email, password, name})
        localStorage.setItem('token', data.token)
        return [jwt_decode(data.token), data.role]
    } catch (e) {
        console.log(e)
    }
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    console.log(data)
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

export const getAccessTokenGithub = async (code) => {
    try {
        const {data} = await $host.get(`api/github/accessToken?code=${code}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return data
    } catch (e) {
        console.log(e)
    }
}

export const getUserDataGithub = async (accessToken) => {
    try {
        const {data} = await $host.get(`api/github/userData?accessToken=${accessToken}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        localStorage.setItem('token', data.token)
        return [jwt_decode(data.token), data.role]
    } catch (e) {
        console.log(e)
    }
}

export const getUserDataGoogle = async (accessToken) => {
    try {
        const {data} = await $host.get(`api/google/userData?accessToken=${accessToken}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        localStorage.setItem('token', data.token)
        return [jwt_decode(data.token), data.role]
    } catch (e) {
        console.log(e)
    }
}

export const getOneUser = async (userId) => {
    const {data} = await $host.get('api/user/' + userId)
    return data
}

export const removeUser = async (id) => {
    await $host.post('api/user/' + id)
}
