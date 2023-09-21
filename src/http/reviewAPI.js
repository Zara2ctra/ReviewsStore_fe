import {$host} from "./index";

export const createReview = async (formData) => {
    const {data} = await $host.post('api/review', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data.id;
}

export const editReview = async (formData, id) => {
    const {data} = await $host.put('api/review' + `/${id}`, formData,{
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

export const fetchPageData = async (userId) => {
    const {data} = await $host.get('api/review/user/' + userId)
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
    const {data} = await $host.get('api/review/recent/' + type)
    return data
}

export const fetchTypePopularReviews = async (type) => {
    const {data} = await $host.get('api/review/popular/' + type)
    return data
}

export const fetchReviewsByQuery = async (query) => {
    const {data} = await $host.get(`/api/review/search?query=${query}`);
    return data;
};

export const fetchOneReview = async (id) => {
    const {data} = await $host.get('api/review/id/' + id)
    return data
}

export const deleteOneReview = async (id) => {
    await $host.delete('api/review/' + id)
}

export const deleteMultipleReviews = async (reviewsIds) => {
    await $host.post('api/review/', {reviewsIds})
}