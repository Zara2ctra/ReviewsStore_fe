import {$host} from "./index";

export const getAccessTokenGithub = async (code) => {
    const {data} = await $host.get(`api/github/accessToken?code=${code}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return data
}

export const getUserDataGithub = async (accessToken) => {
    const {data} = await $host.get(`api/github/userData?accessToken=${accessToken}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return data
}

export const getUserDataGoogle = async (accessToken) => {
    const {data} = await $host.get(`api/google/userData?accessToken=${accessToken}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return data
}