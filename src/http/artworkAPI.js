import {$host} from "./index";

export const createArtWork = async (artworkName, artworkType) => {
    const {data} = await $host.post('api/artWork', {artworkName, artworkType});
    return data;
}

export const getOneArtWork = async (artWorkId) => {
    const artwork = await $host.get('api/artWork/' + artWorkId);
    return artwork;
}

export const getArtworksById = async (artworksId) => {
    const artwork = await $host.get('api/artWork/byId', artworksId);
    return artwork;
}