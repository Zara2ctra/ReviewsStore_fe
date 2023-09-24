import {$host} from "./index";

export const createOrGetArtWork = async (artworkName, artworkType) => {
    const {data} = await $host.post('api/artWork', {artworkName, artworkType});
    return data;
}

export const getOneArtWork = async (artWorkId) => {
    const {data} = await $host.get('api/artWork/' + artWorkId);
    return data;
}

export const getArtworksById = async (artworksId) => {
    const {data} = await $host.get('api/artWork/byId', artworksId);
    return data;
}