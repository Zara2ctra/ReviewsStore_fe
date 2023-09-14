import {$host} from "./index";

export const createReview = async (formData) => {
    const {data} = await $host.post('api/review', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data.id;
}

export const fetchReviews = async () => {
    const {data} = await $host.get('api/review')
    return data
}

export const fetchRecentReviews = async () => {
    const {data} = await $host.get('api/review/recent')
    return data
}

export const fetchPopularReviews = async () => {
    const {data} = await $host.get('api/review/popular')
    return data
}

export const fetchTypeRecentReviews = async (type) => {
    const {data} = await $host.get('api/review/' + type)
    return data
}

export const fetchTypePopularReviews = async (type) => {
    const {data} = await $host.get('api/review/' + type)
    return data
}

export const fetchOneReview = async (id) => {
    const {data} = await $host.get('api/review/id/' + id)
    return data
}

export const deleteReview = async (id) => {
    await $host.delete('api/review/' + id)
}