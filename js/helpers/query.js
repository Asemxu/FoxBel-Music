const getArtist = (id) =>{
    return `artist/${id}`;
}

const getTrackList = (idArtist) =>{
    return `artist/${idArtist}/top?limit=1`
}

const getTrack = (idTrack) =>{
    return `track/${idTrack}`
}

const getSearch = (search) =>{
    return `search?q=${search}`
}

export { getArtist , getTrackList , getTrack , getSearch}