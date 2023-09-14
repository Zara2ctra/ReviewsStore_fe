import {$host} from "./index";

export const createArtWork = async (artworkName, artworkType) => {
    const artwork = await $host.post('api/artWork', {artworkName, artworkType});
    return artwork;
}

export const getOneArtWork = async (artWorkId) => {
    const artwork = await $host.get('api/artWork/' + artWorkId);
    return artwork;
}

export const getArtWorksType = async (type) => {
    const artwork = await $host.post('api/artWork', type);
    return artwork;
}

export const getArtworksById = async (artworksId) => {
    const artwork = await $host.get('api/artWork/byId', artworksId);
    return artwork;
}