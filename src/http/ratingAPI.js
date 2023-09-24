import {$host} from "./index";

export const changeRating = async (rate, userId, reviewId) => {
    if (userId) {
        const {data} = await $host.post('api/rating', {rate, userId, reviewId});
        return data;
    }
}

export const getReviewRating = async (reviewId) => {
    const {data} = await $host.get('api/rating/' + reviewId);
    return data;
}
