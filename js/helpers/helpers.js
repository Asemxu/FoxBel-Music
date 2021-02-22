const getElement = (element) => {
    return document.querySelector(element);
}

const getElements = (element) => {
    return document.querySelectorAll(element);
}

const getObject = (song) => {
    return {
        id:song.id,
        name : song.title_short,
        artista : song.artist.name,
        imagen : song.album.cover_medium,
        song:song.preview,
        album:song.album.title
    }
}

const removeAdd  = (element ,removeClass , addClass) =>{
    element.classList.remove(removeClass);
    element.classList.add(addClass);
}

const templateTrack = (track) =>{
    return ` <div class="busqueda-element-container">
                <div class="busqueda-element-header">
                    <img src="${track.imagen}" alt="img artista">
                    <img class="img-play header" track="${track.id}" src="images/play.svg"  alt="play iamgen"/>
                </div>
                <div class="busqueda-element-body">
                    <h5>${track.name}</h5>
                    <h6>${track.artista}</h6>
                </div>
            </div>`
}

export { getElement , templateTrack , getObject , getElements , removeAdd}


