import {$host} from "./index";

export const toggleLike = async (userId, reviewId) => {
    if (userId) {
        const like = await $host.post('api/like', {userId, reviewId});
        return like;
    }
}

export const fetchNumberLikes = async (userId) => {
    const {data} = await $host.get('api/like/' + userId);
    return data;
}

export const fetchLikeStatus = async (userId, reviewId) => {
    if (userId) {
        const {data} = await $host.post('api/like/status', {userId, reviewId});
        return data;
    }
}